app.controller('OtherController', function($scope, $routeParams, Factory) {
    $scope.currentActivity = {};

    var activityId = $routeParams.param;

    getActivity(activityId);

    function getActivity(id) {
        var promise = Factory.asyncGetActivity(activityId);
        promise.then(
            function() {
                $scope.currentActivity.title = Factory.currentActivity.get('title');
                getFriends();
            },
            function(reason) {
                alert('Parse.com: ' + reason);
            }
        );
    }

    function getFriends() {
        var promise = Factory.asyncGetFriendsOfCurrentActivity();
        promise.then(
            function() {
                $scope.friends = Factory.friends;
            }
        );
    }
});
