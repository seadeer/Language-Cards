var cardsApp = angular.module('cardsApp', ['ngRoute']);
//CONFIG
cardsApp.config(function($routeProvider){
    $routeProvider

    .when('/', {
        templateUrl: 'partials/login.html'
    })

    .when('/cards/new', {
        templateUrl: 'partials/newcard.html'
    });


//DIRECTIVES
cardsApp.directive('autoComplete', function($timeout){
    return function(scope, iElement, iAttrs){
        console.log("Scope", scope)
        iElement.autocomplete({
            source: scope[iAttrs.uiItems],
            select: function(){
                $timeout(function(){
                    iElement.trigger('input');
                }, 0);
            }
        })
    }
})
});

