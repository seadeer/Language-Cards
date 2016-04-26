//FACTORY
userApp.factory('userFactory', function($http, $sessionStorage){
    var factory = {};
    //initialize session storing user
    $sessionStorage.currUser;

    //get user name from db (or create new in db) and store in session
    factory.login = function(newUser, callback){
        console.log("Factory sending off ", newUser)
        $http.post('/login', newUser).success(function(output){
            $sessionStorage.currUser = output;
            console.log($sessionStorage.currUser);
            callback(output);
        });
    };

    factory.logout = function(callback){
        console.log("logged out!");
        $sessionStorage.$reset();
        callback();
    };

    factory.user = function(){
        return $sessionStorage.currUser;
    };

	 factory.scrape = function(){
		 console.log('in scrape factory function')
		 $http.get('/scrape').success(function(output){
			 console.log('output', output)
		 })
	 }

    return factory;
})
