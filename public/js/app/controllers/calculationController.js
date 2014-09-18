app.controller('CalculationController', function($scope, Factory) {
    getFriends();

    function getFriends() {
        var promise = Factory.asyncGetFriendsOfCurrentActivity(true);
        promise.then(
            function() {
                $scope.friends = Factory.friends;
            }
        );
    }

    $scope.getTotalCosts = function() {
        return Factory.totalCosts;
    }

    $scope.getCostsPerPerson = function() {
        return (Factory.totalCosts / Factory.friends.length).toFixed(2);
    }
});
