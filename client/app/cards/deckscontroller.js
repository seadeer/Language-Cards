cardsApp.controller('decksController', function(userFactory, cardFactory, $location, $routeParams){
	var that = this;
	this.cardSide = false
	this.cardInDeck = {};
	this.deck = {};


	this.getDeck = function(){
		var deckId = $routeParams.id
		cardFactory.indexDeck(deckId, function(data){
			console.log('data retrieved from server', data)
			this.deck = data;
		})
	}

	this.showCardInDeck = function(){
		var cardIndex = 0;
		this.cardInDeck = this.deck.cards[cardIndex];
	}

	this.flip = function(){
		this.cardSide = this.cardSide === false ? true: false;
		//if this.cardSide is false, make it true/else, make it false :: ternary
	}

});
