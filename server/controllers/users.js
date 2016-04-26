var mongoose = require('mongoose');
var User = mongoose.model('User');
var Language = mongoose.model('Language');
var Deck = mongoose.model('Deck');

module.exports = {

    login: function(req, res){
        console.log("Logging in...", req.body);
        User.findOne({name:req.body.name}).populate('languages').exec(
            function(err, user){
                if(err){
                    res.json(err)
                }
                else{
                    if(user){
                        console.log("User exists", user);
                        res.json(user);
                    }
                    else{
                        var user = new User(req.body);
                        user.save(function(err, user){
                            console.log(user, "saving new user");
                            if(err){
                                res.json(err);
                            }
                            else{
                                res.json(user);
                            };
                        });
                    }
                }

            });
    },

    indexLang: function(req, res){
        Language.find({}, function(err, langs){
            if(err){
                res.json(err);
            }
            else{
                console.log(langs);
                res.json(langs);
            }
        });
    },

    addLanguage: function(req, res){
        var langId = req.body._id;
        
        User.findOne({_id:req.params.id}, function(err, user){
            //add language id to user's languages
            user.languages.addToSet(langId);
            //save user
            user.save(function(err, user){
                if(err){
                    res.json(err);
                }
                else{
                    console.log("Updating user with languages: ", user);
                    User.findOne({_id:req.params.id}).populate('languages').exec(function(err, user){
                        if(err){
                            res.json(err);
                        }
                        else{
                            res.json(user);
                        }
                    });
                }
            });
        });
    },

    setLanguage: function(req, res){
        langId = req.body._id;
        User.findByIdAndUpdate(req.params.id, {$set: {default_language: langId}}, function(err, user){
            if(err){
                res.json(err);
            }
            else{
                res.json(user);
            }
        });
    }
};
