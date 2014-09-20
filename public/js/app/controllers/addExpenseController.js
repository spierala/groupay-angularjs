app.controller('AddExpenseController', function($scope, $location, Factory) {
    $scope.currentFriend = {};
    $scope.newExpense = {};

    if( Factory.currentFriend != null) {
        $scope.currentFriend.name = Factory.currentFriend.get('name');
    }

    $scope.submitForm = function(isValid) {
        $scope.submitted = true;
        if (isValid) {
            addExpense();
        }
    };

    function addExpense() {
        var promise = Factory.asyncAddExpenseOfFriend($scope.newExpense.title, $scope.newExpense.amount, $scope.newExpense.comment);
        promise.then(
            function() {
                $location.path('/activity');
            },
            function(reason) {
                alert('Parse.com: ' + reason);
            }
        );
    }
});