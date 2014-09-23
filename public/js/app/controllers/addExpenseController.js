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
        var targetMember = {};
        var newExpense = {
            'title' : $scope.newExpense.title,
            'amount' : $scope.newExpense.amount,
            'comment' : $scope.newExpense.comment
        }

        //search member in currentActivity
        angular.forEach(Factory.currentActivity.members, function(member, key) {
            if(Factory.currentMember._id == member._id) {
                targetMember = member;
            };
        });
        targetMember.expenses.push(newExpense);

        //save activity
        var promise = Factory.updateActivity(Factory.currentActivity);
        promise.then(function(result){
            Factory.currentActivity = result.data;
            $location.path('/friend');
        });
    }
});