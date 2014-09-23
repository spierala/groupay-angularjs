app.controller('CreateActivityController', function($scope, $location, Factory) {
    $scope.submitForm = function(isValid) {
        $scope.submitted = true;
        if (isValid) {
            createActivity();
        }
    };

    function createActivity() {
        var activity = {
            title: $scope.newActivity.title,
            members: [{
                name: $scope.newActivity.name,
                email: $scope.newActivity.email
            }]
        }

        var promise = Factory.createActivity(activity);
        promise.then(function(result) {
            Factory.currentActivity = result.data;
            $location.path('/invite');
        });
    }
});