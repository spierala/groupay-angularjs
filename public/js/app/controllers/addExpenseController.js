app.controller('AddExpenseController', function($scope, $window, Factory) {
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
                $window.history.back();
            },
            function(reason) {
                alert('Parse.com: ' + reason);
            }
        );
    }
});