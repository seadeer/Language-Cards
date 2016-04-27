cardsApp.factory('cardFactory', function($http, $sessionStorage){
    var factory = {};
    factory.cards = [];

    factory.index = function(langs, callback){
        //for each language, get the set of cards and put them into the factory object. When all languages are complete, call the callback function.
        var retrieved = langs.length;
        function retrieveComplete(){
            retrieved --;
            if(retrieved <= 0){
                callback(factory.cards);
                factory.cards = [];
            }
        }
        for(var i = 0; i < langs.length; i++){
            var lang = langs[i];
        $http.get('/cards/index/'+ langs[i]).success(function(output){
            for(i in output){
                factory.cards.push(output[i]);
            }
            retrieveComplete();
            });
        }
    };

    ///Need to FIX the function above so that it doesn't keep pushing more cards into the factory each time the page loads!

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
