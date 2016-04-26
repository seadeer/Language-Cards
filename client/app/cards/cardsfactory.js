cardsApp.factory('cardFactory', function($http, $sessionStorage){
    var factory = {};

    factory.indexOwnCards = function(id, callback){
        console.log("Getting five cards from user", id)
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

	 factory.translate = function(word, callback){
		 $http.get('https://www.googleapis.com/language/translate/v2?key=AIzaSyBJ7xnAFQxD3lbhBEx48rbFKVI50gh5xhU&source=en&target=es&q='+word).success(function(output){
			 console.log('RETRIEVED DATA FROM GOOGLE :::', output)
			 callback(output)
		 })
	 }

    return factory;
});
