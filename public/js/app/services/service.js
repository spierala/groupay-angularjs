app.factory('Factory', function ($q) {
    var factory = {};

    factory.activityId = 0;
    factory.currentActivity = {};
    factory.currentFriend;
    factory.friends = [];
    factory.expenses = [];

    factory.getActivityLink = function() {
        return '#/activity/' + factory.activityId;
    }

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
                    deferred.resolve(activity);
                }
            }
        );

        return deferred.promise;
    }

    factory.asyncGetActivity = function(id) {
        var deferred = $q.defer(),
            Activity = Parse.Object.extend("Activity"),
            query = new Parse.Query(Activity);

        query.get(id, {
            success: function(activity) {
                factory.currentActivity = activity;
                deferred.resolve(activity);
            },
            error: function(activity, error) {
                deferred.reject(error.message);
            }
        });

        return deferred.promise;
    }

    factory.asyncInviteFriend = function(name, email) {
        var deferred = $q.defer(),
            Member = Parse.Object.extend("Member");

        //has many relation
        if (factory.currentActivity) {
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

    factory.asyncGetFriendsOfCurrentActivity = function() {
        var deferred = $q.defer();

        if (factory.currentActivity) {
            var relation = factory.currentActivity.relation("members");
            relation.query().find({
                success: function(values) {
                    factory.friends = []; //clear array from old values
                    angular.forEach(values, function(value, key) {
                        factory.friends.push({
                            name: value.attributes.name,
                            email: value.attributes.email,
                            id: value.id
                        });
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

    factory.asyncAddExpenseOfFriend = function(title, costs, comment) {
        var deferred = $q.defer(),
            Expense = Parse.Object.extend("Expense");

        if(factory.currentFriend) {
            var relation = factory.currentFriend.relation("expenses"),
                expense = new Expense();

            expense.set("title", title);
            expense.set("costs", costs);
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
                                console.log('expense: ' + value.attributes.title);
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
                            costs: value.attributes.costs,
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