app.controller('CreateActivityController', function($scope, $location, Factory) {
    $scope.newActivity = {};

    $scope.submitForm = function(isValid) {
        $scope.submitted = true;
        if (isValid) {
            createActivity();
        }
    };

    function createActivity() {
        var promise = Factory.asyncSaveActivity($scope.newActivity.title, $scope.newActivity.name, $scope.newActivity.email);
        promise.then(function() {
            var promiseInviteFriend = Factory.asyncInviteFriend($scope.newActivity.name, $scope.newActivity.email);
            promiseInviteFriend.then(function () {
                $location.path('/invite');
            });
        });
    }
});