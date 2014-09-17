app.controller('InviteFriendsController', function($scope, Factory) {
    var activityId = Factory.activityId;

    if(activityId) {
        getActivity(activityId);
    }

    function getActivity(id) {
        var promise = Factory.asyncGetActivity(id);
        promise.then(function() {
            console.log('activity: ' + Factory.currentActivity.get('title'));
        }, function(reason) {
            alert('Parse.com: ' + reason);
        });
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