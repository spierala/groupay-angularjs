app.controller('OtherController', function($scope, $routeParams, Factory) {
    var activityId = $routeParams.param;

    getActivity(activityId);

    function getActivity(id) {
        var promise = Factory.asyncGetActivity(activityId);
        promise.then(function() {
            console.log('activity: ' + Factory.currentActivity.get('title'));
        });
    }
});
