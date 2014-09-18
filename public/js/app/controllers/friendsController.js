app.controller('FriendsController', function($scope, $routeParams, Factory) {
    console.log('test');

    $scope.currentActivity = {};

    if($routeParams.param !== undefined) {
        Factory.activityId = $routeParams.param;
    }

    getActivity();

    function getActivity() {
        var promise = Factory.asyncGetActivity();
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
