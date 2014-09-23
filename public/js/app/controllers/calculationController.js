app.controller('CalculationController', function($scope, Factory) {
    if(Factory.currentActivity != null) {
        $scope.activity = Factory.currentActivity;
    }

    $scope.costsPerPerson = function() {
        return (Factory.currentActivity.totalCosts / Factory.currentActivity.members.length).toFixed(2);
    }
});
