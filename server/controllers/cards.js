var mongoose = require('mongoose');
var User = mongoose.model('User');
var Card = mongoose.model('Card');

module.exports = {
    indexByUser: function(req, res){
        console.log("in IndexByUser", req.params.id)
        var id = req.params.id;
        User.findOne({_id:id}).populate('cards').exec(function(err, user){
            if(err){
                console.log(err);
                res.json(err)
            }
            else{
                console.log(user.cards)
                res.json(user.cards)
            }
        })
    },

    indexFive: function(req, res){
        var cards = Card.find().sort({'createdAt': -1}).limit(5);
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
                user.cards.push(newCard);
                newCard.save(function(err){
                    if(err){
                        res.json(err);
                        }
                    else{
                        user.save(function(err){
                            if(err){
                                res.json(err);
                            }
                            else{
                                res.json("Card successfully saved!");
                            }
                        });
                    };
                });
            });
        
        };

    });
            
    },

};
