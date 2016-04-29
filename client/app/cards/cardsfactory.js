cardsApp.factory('cardFactory', function($http, $sessionStorage){
    var factory = {};
    factory.cards = [];
    factory.deck = {};

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

    factory.indexCard = function(id, callback){
        $http.get('cards/'+id).success(function(output){
            callback(output);
        })
    }

    factory.indexDeck = function(id, callback){
        $http.get('/decks/'+id).success(function(output){
            factory.deck = output;
            callback(output);
        });
    };

    factory.create = function(data, callback){
        $http.post('/cards/new', data).success(function(output){
            callback(output);
        });
    };

	 factory.translate = function(word, lang, callback){
		 $http.get('https://www.googleapis.com/language/translate/v2?key=AIzaSyBJ7xnAFQxD3lbhBEx48rbFKVI50gh5xhU&source=en&target='+lang+'&q='+word).success(function(output){
			 console.log('RETRIEVED DATA FROM GOOGLE :::', output)
			 callback(output)
		 })
	 }

    factory.createDeck = function(userId, deck, callback){
        $http.post('/users/'+ userId + '/decks/new', deck).success(function(output){
            callback(output);
        });
    };

    factory.addToDeck = function(cardId, deckId, callback){
        var id = {id: cardId};
        console.log("in factory", cardId, deckId);
        $http.post('/decks/'+ deckId, id).success(function(output){
            factory.deck = output;
            callback(output);
        });

    };

    factory.playSound = function(request, callback){
        $http.post('/cards/playSound', request).success(function(output){
            callback(output);
        });
    };

    factory.imgSearch = function(request, callback){
        $http.post('/pixaimgsearch/', request).success(function(output){
            callback(output)
        })
    }

    return factory;
});
