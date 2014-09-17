app.controller('AddExpenseController', function($scope, $window, Factory) {
    $scope.currentFriend = {};

    $scope.currentFriend.name = Factory.currentFriend.get('name');

    $scope.addExpense = function() {
        var promise = Factory.asyncAddExpenseOfFriend($scope.newExpense.title, $scope.newExpense.costs, $scope.newExpense.comment);
        promise.then(
            function() {
                $window.history.back();
            },
            function(reason) {
                alert('Parse.com: ' + reason);
            }
        );
    }
});