var cardsApp = angular.module('cardsApp', ['ngRoute']);
//CONFIG
cardsApp.config(function($routeProvider){
    $routeProvider

    .when('/', {
        templateUrl: 'partials/login.html'
    })

    .when('/cards/new', {
        templateUrl: 'partials/newcard.html'
    })

    .when('/cards/index', {
        templateUrl: 'partials/showcards.html'
    })
	 .when('/deck', {
        templateUrl: 'partials/deckflip.html'
    })
	 .when('/deck/:id', {
        templateUrl: 'partials/deckflip.html'
    })

    .when('/edit/:id', {
        templateUrl: 'partials/editcard.html'
     })

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
        });
    };
});

cardsApp.directive('slideToggle', function(){
    return{
        restrict: 'A',
        scope: {
            isOpen: "=slideToggle" //data-slide-toggle in the html file
        },
        link: function(scope, element, attr){
            var slideDuration = parseInt(attr.slideToggleDuration, 10) || 200;
        scope.$watch('isOpen', function(newIsOpenVal, oldIsOpenVal){
            if(newIsOpenVal !== oldIsOpenVal){
                element.stop().slideToggle(slideDuration);
            }
        });
        }
    }
})

//FILTERS
cardsApp.filter('startFrom', function(){
    return function(input, start){
        start = +start;
        return input.slice(start);
    }
})


cardsApp.filter('trustedAudioUrl', function($sce) {
    return function(path, audioFile) {
        return $sce.trustAsResourceUrl(path + audioFile);
    };
})
