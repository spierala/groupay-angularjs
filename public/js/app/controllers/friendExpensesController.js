app.controller('FriendController', function($scope, $routeParams, Factory) {
    $scope.currentFriend = {};

    var friendId = $routeParams.id;

    getFriend(friendId);

    function getFriend(id) {
        var promise = Factory.asyncGetFriend(id);
        promise.then(
            function() {
                $scope.currentFriend.name = Factory.currentFriend.get('name');
                getExpenses();
            },
            function(reason) {
                alert('Parse.com: ' + reason);
            }
        );
    }

    function getExpenses() {
        var promise = Factory.asyncGetExpensesOfFriend();
        promise.then(
            function() {
                $scope.expenses = Factory.expenses;
            }
        );
    }
});