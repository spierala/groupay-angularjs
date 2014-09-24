app.controller('FriendExpensesController', function($scope, Factory) {
    var currentActivity = Factory.getCurrentMemberOfActivity();
    if(currentActivity != null) {
        $scope.member = currentActivity;
    }
});