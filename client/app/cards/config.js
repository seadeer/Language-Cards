var cardsApp = angular.module('CardsModule', ['ngRoute', 'ngStorage']);
//CONFIG
cardsApp.config(function($routeProvider){
    $routeProvider

    .when('/', {
        templateUrl: 'partials/login.html'
    })
});
