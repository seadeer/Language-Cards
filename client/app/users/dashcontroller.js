//DASHBOARD - here is where info about users and cards comes together. It is part of the user app but separated from the core user functions.
userApp.controller('dashController', function(userFactory, cardFactory, $location){
    var that = this;
    this.error = '';
    this.user = userFactory.user();
    console.log(this.user);
    this.ownCards = [];
    this.otherCards = [];

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
                user_id: that.user._id,
                target_language: that.newCard.target_language,
                target_word: that.newCard.target_word,
                translations: [that.newCard.translation],
                translated_language: that.user.default_language
            }
            cardFactory.create(card, function(data){
                console.log(data);
                that.newCard = {};
                that.indexOwnCards();
            });
        }
    };

    this.create_long = function(){};


});
