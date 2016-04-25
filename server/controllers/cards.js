var mongoose = require('mongoose');
var User = mongoose.model('User');
var Card = mongoose.model('Card');

module.exports = {
    indexByUser: function(req, res){
        console.log("in IndexByUser", req.params.id)
        var id = req.params.id;
        User.findById(id).populate('_card').exec(function(err, user){
            if(err){
                console.log(err);
                res.json(err)
            }
            else{
                console.log(user)
                res.json(user)
            }
        })
    },

    indexFive: function(req, res){
        var cards = Card.find().sort('created_at', -1).limit(5);
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
        
        Card.findOne({target_language: req.body.target_language, target_word: req.body.target_word}, function(err, card){
            if(card){
                res.json("Card already exists!", card)
            }
            else{
                var newCard = new Card(req.body);
                newCard.save(function(err){
                    if(err){
                        res.json(err)
                    }
                    else{
                        res.json("Card successfully saved!");
                    }
                });
            }
        });
    },

};
