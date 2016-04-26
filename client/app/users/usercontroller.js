//CONTROLLER
userApp.controller('usersController', function(userFactory, $location){
    var that = this;
    this.error = ''
    this.user = userFactory.user();
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

    this.logout = function(){
        console.log(that.user);
        userFactory.logout(function(){
            $location.url('/');
            that.user = {};
        })
    }
	 this.scrape = function(){
		 console.log('scraping')
		 userFactory.scrape(function(){
			 console.log('scraped.')
		 })
	 }
	 this.scrape()

})
