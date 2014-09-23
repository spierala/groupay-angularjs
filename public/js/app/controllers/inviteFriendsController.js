app.controller('InviteFriendsController', function($scope, $location, Factory) {
    if(Factory.currentActivity != null) {
        $scope.newActivity = {};
        $scope.newActivity.id = Factory.currentActivity._id;
        $scope.newActivity.title = Factory.currentActivity.title;
        $scope.friends = Factory.currentActivity.members;
    }

    $scope.submitForm = function(isValid) {
        $scope.submitted = true;
        if (isValid) {
            invite();
            $scope.newFriend.name = "";
            $scope.newFriend.email = "";
            $scope.submitted = false;
        }
    }

    function invite() {
        var newMember = {
            name: $scope.newFriend.name,
            email: $scope.newFriend.email
        }
        Factory.currentActivity.members.push(newMember);
        var promise = Factory.updateActivity(Factory.currentActivity);
        promise.then(function(result){
            Factory.currentActivity = result.data;
        });
    }

    // TODO: this function is called twice by the template
    $scope.getActivityLink = function() {
        var port = "";
        if($location.port() != undefined) {
            port = ":" + $location.port() + "/";
        }
        return $location.host() + port + '#/activity/' + Factory.currentActivity._id;
    }
});