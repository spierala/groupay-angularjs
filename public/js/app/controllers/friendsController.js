app.controller('FriendsController', function($scope, $routeParams, $location, Factory) {
    if($routeParams.param !== undefined) {
        getActivity($routeParams.param);
    } else if(Factory.currentActivity != null) {
        $scope.activity = Factory.currentActivity;
    }

    function getActivity(activityId) {
        var promise = Factory.getActivityById(activityId);
        promise.then(
            function(result) {
                Factory.currentActivity = result.data;
                $scope.activity = Factory.currentActivity;
            }
        );
    }

    $scope.onMemberListItemClicked = function(member) {
        Factory.currentMemberId = member._id;
        $location.path('/friend');
    }
});
