Parse.initialize("QClWidkZclFrGj4dXCKmzDcJbRDLAB3G2aBRBjpy", "zzUUPruvQjNhTdeJ5ByJpI3mUglagorwSgULbWC2");

var app = angular.module('groupay', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/view1', {
            controller: 'CreateActivityController',
            templateUrl: 'partials/create-activity.html'
        })
        .when('/invite', {
            controller: 'InviteFriendsController',
            templateUrl: '/partials/invite-friends.html'
        })
        .when('/activity/:param', {
            controller: 'OtherController',
            templateUrl: '/partials/friends.html'
        })
        .when('/friend/:id', {
            controller: 'FriendController',
            templateUrl: '/partials/friend-expenses.html'
        })
        .when('/add-expense', {
            controller: 'AddExpenseController',
            templateUrl: '/partials/add-expense.html'
        })
        .when('/view6', {
            controller: 'SimpleController',
            templateUrl: '/partials/calculation.html'
        })
        .otherwise({redirectTo: '/view1'})
});