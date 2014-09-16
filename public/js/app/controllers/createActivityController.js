app.controller('CreateActivityController', function($scope, Factory) {

    $scope.newActivity = {};
    $scope.newActivity.title = 'barca';
    $scope.newActivity.name = 'flo';
    $scope.newActivity.email = 'spierala@gmx.de';

    $scope.createActivity = function() {
        var promise = Factory.asyncSaveActivity($scope.newActivity.title, $scope.newActivity.name, $scope.newActivity.email);
        promise.then(function() {
            $scope.newActivity.id = Factory.activityId;
        });
    }

    $scope.getActivityLink = function() {
        return Factory.getActivityLink();
    }

    $scope.getActivity = function() {
        var promise = asyncGetActivity('bOt4JNJvx');
        promise.then(function(result) {
                $scope.test.result = result.id;
            },
            function(reason) {
                alert('Failed: ' + reason);
            });
    }
});