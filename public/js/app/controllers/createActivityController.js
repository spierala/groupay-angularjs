app.controller('CreateActivityController', function($scope, $location, Factory) {
    $scope.newActivity = {};
    $scope.createActivity = function() {
        var promise = Factory.asyncSaveActivity($scope.newActivity.title, $scope.newActivity.name, $scope.newActivity.email);
        promise.then(function() {
            var promiseInviteFriend = Factory.asyncInviteFriend($scope.newActivity.name, $scope.newActivity.email);
            promiseInviteFriend.then(function(){
                $location.path('/invite');
            });
        });
    }
});