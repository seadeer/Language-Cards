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
                console.log(user)
                res.json(user)
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
                User.findOne({_id:req.body.user_id}, function(err, user){ 
                var newCard = new Card({target_language: req.body.target_language, target_word: req.body.target_word, translated_language: req.body.translated_language, translations: req.body.translations});
                newCard._creator = req.body.user_id;
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
