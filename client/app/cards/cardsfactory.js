cardsApp.factory('cardFactory', function($http, $sessionStorage){
    var factory = {};

    factory.indexOwnCards = function(id, callback){
        console.log("Getting five cards from user", id);
        $http.get('/users/'+id+'/cards/index').success(function(output){
            callback(output);
        });
    };

    factory.indexFive = function(callback){
        $http.get('/cards/index5').success(function(output){
            callback(output);
        });
    };

    factory.create = function(data, callback){
        $http.post('/cards/new', data).success(function(output){
            callback(output);
        });
    };

    factory.createDeck = function(userId, deck, callback){
        $http.post('/users/'+ userId + '/decks/new', deck).success(function(output){
            callback(output);
        });
    };

    return factory;
});
