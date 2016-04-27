//This controller is responsible for users and getting all the user assets.
userApp.controller('usersController', function(userFactory, $location){
    var that = this;
    this.error = ''
    this.languages = {};
    this.user = userFactory.user();
    console.log("Languages: ", this.languages);
    this.login = function(){
        console.log("Logging in", that.newUser);
        if(typeof(that.newUser) != 'undefined' && that.newUser.name.length >= 3){
        userFactory.login(that.newUser, function(data){
            that.user = data;
            $location.url('/home');
        });
    }
    else{
        console.log("Got undefined")
        that.error = "User name should be longer than 3 characters!"
    }
    };

    //Get the user object populated with languages and decks

    this.updateUser = function(){
        userFactory.updateUser(that.user._id, function(data){
            that.user = data;
        });
    };
    if(this.user){
    this.updateUser();
    } 

    this.getLangs = function(){
        userFactory.getLangs(function(data){
            that.languages = data;
            console.log(that.languages);
        });
    };
    this.getLangs();

    //Set user's set of languages to determine which cards to display
    this.addLanguage = function(){
        console.log("NewLanguage: ", that.newLanguage)
        userFactory.addLanguage(that.newLanguage, that.user._id, function(data){
            that.user = data;
            console.log("Updated user", that.user);
            that.newLanguage = {};
        });
    };

    //Set user's default language
    this.setLanguage = function(){
        userFactory.setLanguage(that.userLanguage, that.user._id, function(data){
            that.user = data;
            that.userLanguage = {};
            console.log("Updated user", that.user);
        })
    }

    this.logout = function(){
        console.log(that.user);
        userFactory.logout(function(){
            $location.url('/');
            that.user = {};
        });
    };

});

