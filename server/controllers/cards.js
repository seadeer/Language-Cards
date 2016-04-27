var mongoose = require('mongoose');
var User = mongoose.model('User');
var Card = mongoose.model('Card');
var Deck = mongoose.model('Deck');

module.exports = {
    indexByUser: function(req, res){
        console.log("in IndexByUser", req.params.id);
        var id = req.params.id;
        User.findOne({_id:id}).populate('cards').exec(function(err, user){
            if(err){
                console.log(err);
                res.json(err);
            }
            else{
                console.log(user.cards);
                res.json(user.cards);
            }
        });
    },

    index: function(req, res){
        console.log("Executing find all query, language:", req.params.id)
        Card.find({target_language : req.params.id}).populate('_creator', 'name').exec(function(err, cards){
            if(err){
                res.json(err);
            }
            else{
                res.json(cards);
            }
        });
    },

    indexFive: function(req, res){
        var cards = Card.find().sort({'createdAt': -1}).populate('_creator', 'name').limit(5);
        cards.exec(function(err, cards){
            if(err){
                res.json(err);
            }
            else{
                res.json(cards);
            }
        });
    },

    create: function(req, res){
        console.log("looking for this card: ", req.body)
        Card.findOne({target_language: req.body.target_language, target_word: req.body.target_word}, function(err, card){
            if(card){
                res.json("Card already exists!", card)
            }
            else{
                User.findOne({_id:req.body._creator}, function(err, user){ 
                var newCard = new Card(req.body);
                newCard.save(function(err){
                    if(err){
                        res.json(err);
                        }
                    else{
                        res.json("Card successfully saved!");
                        }
                    });
                });
            }
        
        });
    },

    createDeck: function(req, res){
        console.log(req.body);
        User.findOne({_id:req.params.id}, function(err, user){
            var deck = new Deck(req.body);
            deck.save(function(err, deck){
                if(err){
                    res.json(err);
                }
                else{
                user.decks.addToSet(deck._id);
                user.save();
                res.json(deck);
            }
            });
        });
    },

    indexDeck: function(req, res){
        console.log("Got request for a deck ", req.body);
        Deck.findOne({_id:req.params.id}, function(err, deck){
            if(err){
                res.json(err);
            }
            else{
                res.json(deck);
            }
        });
    },

    addToDeck: function(req, res){
        console.log("Adding card to deck", req.body);
        var id = req.body.id;
        Deck.findById(req.params.id, function(err, deck){
            Card.findById(id, function(err, card){
                deck.cards.addToSet(card);
                deck.save(function(err, deck){
                    if(err){
                        res.json(err)
                    }
                    else{
                        res.json(deck)
                    }
                })

            });
        });
            
    },
        
    

};
