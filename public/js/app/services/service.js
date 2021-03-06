app.factory('Factory', function ($q) {
    var factory = {};

    factory.activityId = 0;
    factory.currentActivity = null;
    factory.currentFriend = null;
    factory.friends = [];
    factory.expenses = [];
    factory.totalCosts = 0;

    /* EXTEND PARSE.COM OBJECTS
     -------------------------------------------- */
    var Member = Parse.Object.extend("Member", {
        // Instance methods
        calc: function () {
            var deferred = $q.defer();

            var costs = 0;
            var relation = this.relation("expenses");
            relation.query().find({
                success: function(values) {
                    costs = 0;
                    angular.forEach(values, function(value, key) {
                        costs += Number(value.attributes.amount);
                    });
                    factory.totalCosts += costs;
                    deferred.resolve(costs);
                }
            });

            return deferred.promise;
        }
    });

    /* ASYNC PARSE.COM CALLS
     -------------------------------------------- */
    factory.asyncSaveActivity = function(title, name, email) {
        var deferred = $q.defer(),
            Activity = Parse.Object.extend("Activity"),
            activity = new Activity();

        activity.save(
            {
                title: title,
                name: name,
                email: email
            },
            {
                success: function(activity) {
                    factory.activityId = activity.id;
                    factory.currentActivity = activity;
                    deferred.resolve(activity);
                }
            }
        );

        return deferred.promise;
    }

    factory.asyncGetActivity = function() {
        var deferred = $q.defer(),
            Activity = Parse.Object.extend("Activity"),
            query = new Parse.Query(Activity);

        if(factory.activityId != 0) {
            query.get(factory.activityId, {
                success: function(activity) {
                    factory.currentActivity = activity;
                    deferred.resolve(activity);
                },
                error: function(activity, error) {
                    deferred.reject(error.message);
                }
            });
        }

        return deferred.promise;
    }

    factory.asyncInviteFriend = function(name, email) {
        var deferred = $q.defer(),
            Member = Parse.Object.extend("Member");

        //has many relation
        if (factory.currentActivity != null) {
            var relation = factory.currentActivity.relation("members");

            var member = new Member();
            member.set("name", name);
            member.set("email", email);

            member.save(null, {
                success: function(member) {
                    // The object was saved successfully.
                    relation.add(member);
                    factory.currentActivity.save();

                    relation.query().find({
                        success: function(values) {
                            factory.friends = []; //clear array from old values
                            angular.forEach(values, function(value, key) {
                                factory.friends.push({name: value.attributes.name, email: value.attributes.email});
                            });
                            deferred.resolve();
                        }
                    });
                },
                error: function(movie, error) {
                    deferred.reject(error.message);
                }
            });
        }

        return deferred.promise;
    }

    factory.asyncGetFriendsOfCurrentActivity = function(calculateCosts) {
        calculateCosts = calculateCosts || false; //set default for calculateCosts parameter

        var deferred = $q.defer();
        factory.totalCosts = 0; //reset total costs

        if (factory.currentActivity != null) {
            var relation = factory.currentActivity.relation("members");
            relation.query().find({
                success: function(values) {
                    factory.friends = []; //clear array from old values
                    angular.forEach(values, function(value, key) {
                        if(calculateCosts == true) {
                            var promise = value.calc();
                            promise.then(
                                function(costs) {
                                    factory.friends.push({
                                        name: value.attributes.name,
                                        email: value.attributes.email,
                                        id: value.id,
                                        costs: costs
                                    });
                                }
                            );
                        } else {
                            factory.friends.push({
                                name: value.attributes.name,
                                email: value.attributes.email,
                                id: value.id
                            });
                        }
                    });
                    deferred.resolve();
                }
            });
        }

        return deferred.promise;
    }

    factory.asyncGetFriend = function(id) {
        var deferred = $q.defer(),
            Member = Parse.Object.extend("Member"),
            query = new Parse.Query(Member);

        query.get(id, {
            success: function(friend) {
                factory.currentFriend = friend;
                deferred.resolve(friend);
            },
            error: function(friend, error) {
                deferred.reject(error.message);
            }
        });

        return deferred.promise;
    }

    factory.asyncAddExpenseOfFriend = function(title, amount, comment) {
        var deferred = $q.defer(),
            Expense = Parse.Object.extend("Expense");

        if(factory.currentFriend) {
            var relation = factory.currentFriend.relation("expenses"),
                expense = new Expense();

            expense.set("title", title);
            expense.set("amount", amount);
            expense.set("comment", comment);

            expense.save(null, {
                success: function(expense) {
                    // The object was saved successfully.
                    relation.add(expense);
                    factory.currentFriend.save();

                    relation.query().find({
                        success: function(values) {
                            factory.expenses = []; //clear array from old values
                            angular.forEach(values, function(value, key) {
                                factory.expenses.push({title: value.attributes.title});
                            });
                            deferred.resolve();
                        }
                    });
                },
                error: function(movie, error) {
                    deferred.reject(error.message);
                }
            });
        }

        return deferred.promise;
    }

    factory.asyncGetExpensesOfFriend = function() {
        var deferred = $q.defer();

        if(factory.currentFriend) {
            var relation = factory.currentFriend.relation("expenses");
            relation.query().find({
                success: function(values) {
                    factory.expenses = []; //clear array from old values
                    angular.forEach(values, function(value, key) {
                        factory.expenses.push({
                            title: value.attributes.title,
                            amount: value.attributes.amount,
                            comment: value.attributes.comment
                        });
                    });
                    deferred.resolve();
                }
            });
        }

        return deferred.promise;
    }

    return factory;
});