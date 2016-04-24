var cardsApp = angular.module('cardsApp', ['ngRoute']);
//CONFIG
cardsApp.config(function($routeProvider){
    $routeProvider

    .when('/', {
        templateUrl: 'partials/login.html'
    })
});
