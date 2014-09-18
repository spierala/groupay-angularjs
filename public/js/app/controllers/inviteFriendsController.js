app.controller('InviteFriendsController', function($scope, Factory) {
    getFriends();

    function getFriends() {
        var promise = Factory.asyncGetFriendsOfCurrentActivity();
        promise.then(
            function() {
                $scope.friends = Factory.friends;
            }
        );
    }

    $scope.newFriend = {};
    $scope.newFriend.name = 'sash';
    $scope.newFriend.email = 'sashion@gmx.de';

    $scope.invite = function() {
        var promise = Factory.asyncInviteFriend($scope.newFriend.name, $scope.newFriend.email);
        promise.then(function() {
            $scope.friends = Factory.friends;
        });
    }
});