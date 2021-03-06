Parse.initialize("QClWidkZclFrGj4dXCKmzDcJbRDLAB3G2aBRBjpy", "zzUUPruvQjNhTdeJ5ByJpI3mUglagorwSgULbWC2");

var app = angular.module('groupay', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/view1', {
            controller: 'CreateActivityController',
            templateUrl: 'partials/create-activity.html',
        })
        .when('/invite', {
            controller: 'InviteFriendsController',
            templateUrl: '/partials/invite-friends.html'
        })
        .when('/activity/:param', {
            controller: 'FriendsController',
            templateUrl: '/partials/friends.html',
            activetab: 'members'
        })
        .when('/activity', {
            controller: 'FriendsController',
            templateUrl: '/partials/friends.html',
            activetab: 'members'
        })
        .when('/friend/:id', {
            controller: 'FriendExpensesController',
            templateUrl: '/partials/friend-expenses.html',
            activetab: 'members'
        })
        .when('/add-expense', {
            controller: 'AddExpenseController',
            templateUrl: '/partials/add-expense.html',
            activetab: 'members'
        })
        .when('/calculation', {
            controller: 'CalculationController',
            templateUrl: '/partials/calculation.html',
            activetab: 'calculation'
        })
        .otherwise({redirectTo: '/view1'})
});