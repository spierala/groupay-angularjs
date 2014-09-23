app.factory('Factory', function ($q, $http) {
    var factory = {};

    factory.currentActivity = null;
    factory.currentMember = null;

    /* RESTFUL SERVICE
     -------------------------------------------- */
    factory.getActivities = function(callback) {
        return $http.get('/api/activity');
    }

    factory.getActivityById = function(id) {
        return $http.get('/api/activity/' + id);
    }

    factory.createActivity = function(newActivity) {
        return $http.post('/api/activity', newActivity);
    }

    factory.updateActivity = function(updatedActivity) {
        return $http.put('/api/activity', updatedActivity);
    }

    return factory;
});