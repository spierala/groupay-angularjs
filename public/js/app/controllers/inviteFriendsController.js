app.controller('InviteFriendsController', function($scope, $location, Factory) {
    getFriends();

    if(Factory.currentActivity != null) {
        $scope.newActivity = {};
        $scope.newActivity.id = Factory.currentActivity.id;
        $scope.newActivity.title = Factory.currentActivity.get('title');
    }

    $scope.submitForm = function(isValid) {
        console.log("submit");
        $scope.submitted = true;
        if (isValid) {
            invite();
        }
    }

    function getFriends() {
        var promise = Factory.asyncGetFriendsOfCurrentActivity();
        promise.then(
            function() {
                $scope.friends = Factory.friends;
            }
        );
    }

    function invite() {
        var promise = Factory.asyncInviteFriend($scope.newFriend.name, $scope.newFriend.email);
        promise.then(function() {
            $scope.friends = Factory.friends;
            $scope.submitted = false;
            $scope.newFriend.name = "";
            $scope.newFriend.email = "";
            getFriends();
        });
    }

    $scope.getActivityLink = function() {
        return $location.host() + '#/activity/' + Factory.activityId;
    }
});