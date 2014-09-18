app.controller('CreateActivityController', function($scope, Factory) {
    $scope.newActivity = {};
    $scope.createActivity = function() {
        var promise = Factory.asyncSaveActivity($scope.newActivity.title, $scope.newActivity.name, $scope.newActivity.email);
        promise.then(function() {
            $scope.newActivity.id = Factory.activityId;
            Factory.asyncInviteFriend($scope.newActivity.name, $scope.newActivity.email);
        });
    }

    $scope.getActivityLink = function() {
        return Factory.getActivityLink();
    }
});