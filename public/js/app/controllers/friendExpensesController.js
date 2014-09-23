app.controller('FriendExpensesController', function($scope, Factory) {
    if(Factory.currentMember != null) {
        $scope.member = Factory.currentMember;
    }
});