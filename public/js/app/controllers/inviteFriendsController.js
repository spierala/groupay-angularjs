app.controller('InviteFriendsController', function($scope, $location, Factory) {
    $scope.newActivity = {};
    $scope.newActivity.id = Factory.currentActivity.id;
    $scope.newActivity.title = Factory.currentActivity.get('title');

    getFriends();

    function getFriends() {
        var promise = Factory.asyncGetFriendsOfCurrentActivity();
        promise.then(
            function() {
                $scope.friends = Factory.friends;
            }
        );
    }

    $scope.invite = function() {
        var promise = Factory.asyncInviteFriend($scope.newFriend.name, $scope.newFriend.email);
        promise.then(function() {
            $scope.friends = Factory.friends;
        });
    }

    $scope.getActivityLink = function() {
        return $location.host() + '#/activity/' + Factory.activityId;
    }
});