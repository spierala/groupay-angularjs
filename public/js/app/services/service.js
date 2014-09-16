app.factory('Factory', function ($q) {
    var factory = {};

    factory.activityId = 0;
    factory.currentActivity = {};

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

    return factory;
});