//This controller is responsible for both cards and decks, as there isn't that much going on with cards.
cardsApp.controller('cardsController', function($scope, userFactory, cardFactory, $location){
    var that = this;
    this.error = ''
    this.user = userFactory.user();
    this.decks = [];
    this.pos = ['Noun', 'Verb', 'Adjective', 'Adverb', 'Preposition', 'Pronoun', 'Conjunction', 'Particle', 'Interjection', 'Copula', 'Article', 'Determiner'];

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
                translations: that.newCard.translations,
                part_of_speech: that.newCard.part_of_speech,
                translated_language: that.user.default_language,
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

});

