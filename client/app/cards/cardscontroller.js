//This controller is responsible for both cards and decks, as there isn't that much going on with cards.

cardsApp.controller('cardsController', function($scope, userFactory, cardFactory, $sce, $location, $routeParams){

    var that = this;
    this.error = ''
    this.user = userFactory.user();
    this.deck = {};
    that.audioEl = {};
    this.pos = ['Noun', 'Verb', 'Adjective', 'Adverb', 'Preposition', 'Pronoun', 'Conjunction', 'Particle', 'Interjection', 'Copula', 'Article', 'Determiner'];

    this.currentPage = 0;
    this.pageSize = 15;
    this.cards = {};
    this.numberOfPages = function(){
        return Math.ceil(that.cards.length / that.pageSize);
    };

	 this.translateStr = ''
	 this.translateAbbr = ''
	 this.googResponse = ''

	 this.creationErrors = []

	 this.cardSide = false
	 this.cardInDeck = {};

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
                target_language: JSON.parse(this.newCard.target_language).name,

					 language_code: JSON.parse(this.newCard.target_language).abbreviation,

                target_word: that.googResponse,
                translations: [that.newCard.translations[0], that.newCard.translations[1], that.newCard.translations[2]],
                part_of_speech: that.newCard.part_of_speech,
                translated_language: that.user.default_language,
					 image_url: that.newCard.image_url,
                contexts: that.newCard.contexts,
            };
            console.log("new card",card);
            cardFactory.create(card, function(data){
                console.log(data);
                that.newCard={};
                $location.url('/home');
                //not sure if we need this line or not
                that.updateUser();
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
		 console.log(that.theCard, that.theDeck)
        cardFactory.addToDeck(that.theCard._id, that.theDeck._id, function(data){
            console.log(data);
        })
    }

	 this.translate = function(){
		console.log('function invoked')

		this.translateAbbr = JSON.parse(this.newCard.target_language).abbreviation;
		console.log(typeof(this.newCard.target_language))
		console.log("str: ",this.translateStr," full value: ", this.newCard.target_language, "abbr:", this.translateAbbr)

		if (this.translateStr && this.translateAbbr){
			cardFactory.translate(this.translateStr, this.translateAbbr, function(data, callback){
			   console.log(data, "this is what called back")
			   that.googResponse = data.data.translations[0].translatedText
			   console.log(that.googResponse)
			})
		}
		else if (!this.translateAbbr){
			console.log('language needed!')
			that.error += "You must choose a language!"
		}
		else if (!this.translateStr){
			console.log('query needed!')
			that.error += "You must enter a word to search for!";
		}
   };

    this.playSound = function(card){
        console.log(card);

        var sound_request = {
            langCode: card.language_code.toLowerCase(),
            word: card.target_word
        };

        cardFactory.playSound(sound_request, function(data, $sce){
            console.log(data);
            if(!data.error){
            that.soundUrlOgg = data.linkOgg;
            that.soundUrlMp3 = data.linkMp3
            var sound = new Audio(that.soundUrlMp3 + ".mp3");
                sound.play();
            }
            else{
                that.playError = data.error
            }
        });

   };

	this.getDeck = function(){

	}

});
