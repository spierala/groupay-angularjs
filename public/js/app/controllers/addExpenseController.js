app.controller('AddExpenseController', function($scope, $location, Factory) {
    $scope.newExpense = {};

    if(Factory.currentMember != null) {
        $scope.currentFriend = Factory.currentMember;
    }

    $scope.submitForm = function(isValid) {
        $scope.submitted = true;
        if (isValid) {
            addExpense();
        }
    };

    function addExpense() {
        var targetMember = Factory.getCurrentMemberOfActivity();
        var newExpense = {
            'title' : $scope.newExpense.title,
            'amount' : $scope.newExpense.amount,
            'comment' : $scope.newExpense.comment
        }

        targetMember.expenses.push(newExpense);

        //save activity
        var promise = Factory.updateActivity(Factory.currentActivity);
        promise.then(function(result){
            Factory.currentActivity = result.data;
            $location.path('/friend');
        });
    }
});