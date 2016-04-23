//CONTROLLER
cardsApp.controller('cardsController', function(userFactory, $location){
    var that = this;
    this.error = ''
    this.login = function(){
        if(typeof(that.newUser) != 'undefined' && that.newUser.name.length >= 3){
        userFactory.login(that.newUser, function(data){
            that.newUser = data;

            $location.url('/home');
        });
    }
    else{
        that.error = "User name should be longer than 3 characters!"
    }
    };

    this.logout = function(){
        console.log(that.user);
        usersFactory.logout(function(){
            $location.url('/login');
            that.user = {};
        })
    }

})

