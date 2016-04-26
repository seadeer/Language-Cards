var userApp = angular.module('userApp', ['ngRoute', 'ngStorage']);
//CONFIG
userApp.config(function($routeProvider){
    $routeProvider

    .when('/', {
        templateUrl: 'partials/login.html'
    })

    .when('/home', {
        templateUrl: 'partials/dashboard.html'
    })
});

