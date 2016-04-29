cardsApp.controller('oneDeckController', function(userFactory, cardFactory, $location, $routeParams){
	var that = this;
	this.deck = {}
	this.cardSide = false
	this.cardInDeck = 0
	this.deckCards;
	console.log(this.deck, "THIS DOT DECK")

	this.getDeckFromURL = function(){
		console.log('Retrieving Deck')
		var deckID = $routeParams.id
		cardFactory.indexDeck(deckID, function(data){
			console.log("DECK retrieved",data)
			that.deck = data;
			that.deckCards = data.cards
			console.log(that.deckCards[0].target_word)
		})
	}
	this.getDeckFromURL()

	this.flip = function(){
		console.log('attempting flip')
		that.cardSide = that.cardSide === false ? true : false
		console.log(that.cardSide)
	}

	this.moveBkwd = function(){
		if (that.cardInDeck > 0) {
			that.cardInDeck -= 1;
			that.cardSide = false;
		}
	}

	this.moveFwd = function(){
		if(that.cardInDeck < that.deckCards.length - 1){
			that.cardInDeck += 1;
			that.cardSide = false;
		}
	}






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

	this.logout = function(){
		 console.log(that.user);
		 usersFactory.logout(function(){
			  $location.url('/login');
			  that.user = {};
		 });
	};
})
