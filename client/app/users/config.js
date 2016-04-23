var userApp = angular.module('UserModule', ['ngRoute', 'ngStorage']);
//CONFIG
userApp.config(function($routeProvider){
    $routeProvider

    .when('/', {
        templateUrl: 'partials/login.html'
    })
});
