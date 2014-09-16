var groupayApp = angular.module('groupay', ['ngRoute']);

groupayApp.config(function($routeProvider){
    $routeProvider
        .when('/view1', {
            controller: 'SimpleController',
            templateUrl: 'partials/create-activity.html'
        })
        .when('/view2', {
            controller: 'SimpleController',
            templateUrl: '/partials/invite-friends.html'
        })
        .when('/view3', {
            controller: 'SimpleController',
            templateUrl: '/partials/friends.html'
        })
        .when('/view4', {
            controller: 'SimpleController',
            templateUrl: '/partials/friend-expenses.html'
        })
        .when('/view5', {
            controller: 'SimpleController',
            templateUrl: '/partials/add-expense.html'
        })
        .when('/view6', {
            controller: 'SimpleController',
            templateUrl: '/partials/calculation.html'
        })
        .otherwise({redirectTo: '/view1'})
});

groupayApp.controller('SimpleController', function($scope) {
    $scope.customers = [
        {name: 'flo', city: 'Antwerpen'},
        {name: 'jörg', city: 'Nürnberg'}
    ];

    $scope.addCustomer = function() {
        console.log('addCustomer');
        $scope.customers.push({name: 'Bieke', city: 'Ruislede'});
    }
} );