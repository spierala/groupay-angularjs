app.controller('CreateActivityController', function($scope, $location, Factory) {
    $scope.newActivity = {};
    $scope.createActivity = function() {
        var promise = Factory.asyncSaveActivity($scope.newActivity.title, $scope.newActivity.name, $scope.newActivity.email);
        promise.then(function() {
            $scope.newActivity.id = Factory.activityId;
            Factory.asyncInviteFriend($scope.newActivity.name, $scope.newActivity.email);
        });
    }

    $scope.getActivityLink = function() {
        return $location.host() + '/index.html' + '#/activity/' + Factory.activityId;
    }

});