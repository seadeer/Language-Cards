//This controller is responsible for both cards and decks, as there isn't that much going on with cards.
cardsApp.controller('cardsController', function($scope, userFactory, cardFactory, $location){
    var that = this;
    this.error = ''
    this.user = userFactory.user();
    this.deck = {};
    this.pos = ['Noun', 'Verb', 'Adjective', 'Adverb', 'Preposition', 'Pronoun', 'Conjunction', 'Particle', 'Interjection', 'Copula', 'Article', 'Determiner'];

    this.currentPage = 0;
    this.pageSize = 15;
    this.cards = {};
    this.numberOfPages = function(){
        return Math.ceil(that.cards.length / that.pageSize);
    };


    this.logout = function(){
        console.log(that.user);
        usersFactory.logout(function(){
            $location.url('/login');
            that.user = {};
        });
    };

    //long version of creating a card, with all the fields
    this.create_long = function(){
        that.errors = [];
        //validations here
        if(that.errors.length <= 0){
            console.log("Validations passed, saving new card!");
            var card = {
                _creator: that.user._id,
                target_language: that.newCard.target_language,
                target_word: that.newCard.target_word,
                translations: [that.newCard.translations[0], that.newCard.translations[1], that.newCard.translations[2]],
                part_of_speech: that.newCard.part_of_speech,
                translated_language: that.user.default_language,
					 image_url: that.newCard.image_url,
                contexts: that.newCard.contexts,
            };
            console.log(card);
            cardFactory.create(card, function(data){
                console.log(data);
                that.newCard={};
                $location.url('/home');
                //not sure if we need this line or not
                usersController.updateUser();
            });
        }
    };

    this.updateUser = function(){
        userFactory.updateUser(that.user._id, function(data){
            that.user = data;
        });
    };

    //display all of the cards in user's languages
    this.index = function(){
        languageNames = that.user.languages.map(function(a){return a.name});
        console.log("Language Name array: ", languageNames);
        cardFactory.index(languageNames, function(data){
            that.cards = data;
        });
    };

    this.index();

    this.indexDeck = function(deckID){
        console.log("This is the deck I'm going to get:", deckID);
        cardFactory.indexDeck(deckID, function(data){
            console.log(data);
            that.deck = data;
        })
    }

    this.createDeck = function(){
        that.errors = [];
        //add validations :p
        if(that.errors.length <= 0){
            console.log("Validations passed, saving new deck!");
            cardFactory.createDeck(that.user._id, that.newDeck, function(data){
                console.log(data);
                that.updateUser();
            });
        }
    };

    this.addToDeck = function(){
        cardFactory.addToDeck(that.theCard._id, that.theDeck._id, function(data){
            console.log(data);
        })
    }

	 this.translate = function(){
		console.log('function invoked')
		console.log(this.translateStr)
		if (this.translateStr){
			cardFactory.translate(this.translateStr, function(data, callback){
			   console.log(data, "this is what called back")
			   that.googResponse = data.data.translations[0].translatedText
			   console.log(that.googResponse)
			})
		}
   }

});
