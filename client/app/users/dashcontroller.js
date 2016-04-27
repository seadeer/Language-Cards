//DASHBOARD - here is where info about users and cards comes together. It is part of the user app but separated from the core user functions.
userApp.controller('dashController', function(userFactory, cardFactory, $location){
	console.log('reinstantiating dashController')
    var that = this;
    this.error = '';
    this.user = userFactory.user();
    console.log(this.user);
    this.ownCards = [];
    this.otherCards = [];
	 
    this.pos = ['Noun', 'Verb', 'Adjective', 'Adverb', 'Preposition', 'Pronoun', 'Conjunction', 'Particle', 'Interjection', 'Copula', 'Article', 'Determiner'];

	 console.log('this.googResponse')

    //get 5 of user's recent cards
    this.indexOwnCards = function(){
        cardFactory.indexOwnCards(this.user._id, function(data){
            if(data){
                that.ownCards = data;
                console.log(data);
            }
        });
    };

    this.indexOwnCards();
    //get 5 of other users' cards
    //can we do this and indexUser in a single query???
    this.indexFive = function(){
        cardFactory.indexFive(function(data){
            if(data){
                that.otherCards = data;
            }
        });
    };

    this.indexFive();

    this.create = function(){
        that.errors = [];
        //validations here
        if(that.errors.length <= 0){
            console.log("Validations passed, saving new card!");
            var card = {
                _creator: that.user._id,
                target_language: that.newCard.target_language,
                target_word: that.newCard.target_word,
                translations: that.newCard.translations,
                translated_language: that.user.default_language
            }
            cardFactory.create(card, function(data){
                console.log(data);
                that.newCard = {};
                that.indexOwnCards();
                that.indexFive();
            });
        }
    };

    this.create_long = function(){
         that.errors = [];
        //validations here
        if(that.errors.length <= 0){
            console.log("Validations passed, saving new card!");
            var card = {
                _creator: that.user._id,
                target_language: that.newCard.target_language,
                target_word: that.newCard.target_word,
					 image_url: that.newCard.image_url,
                translations: that.newCard.translations,
                part_of_speech: that.newCard.part_of_speech,
                translated_language: that.user.default_language.name,
                contexts: that.newCard.contexts,
            };
            console.log(card);
            cardFactory.create(card, function(data){
                console.log(data);
                that.newCard={};
                $location.url('/home');
                that.index();
            });
        }
    };



});
