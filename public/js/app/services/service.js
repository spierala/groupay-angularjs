app.factory('Factory', function ($q) {
    var factory = {};

    factory.activityId = 0;
    factory.currentActivity = {};
    factory.friends = [];

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

    return factory;
});