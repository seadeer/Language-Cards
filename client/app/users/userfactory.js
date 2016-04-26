//FACTORY
userApp.factory('userFactory', function($http, $sessionStorage){
    var factory = {};
    //initialize session storing user
    $sessionStorage.currUser;
    factory.languages = {};

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

    factory.getLangs = function(callback){
        $http.get('/languages/index').success(function(output){
            factory.languages = output;
            callback(output);
        });
    };

    factory.addLanguage = function(language, id, callback){
        $http.post('/users/' + id + '/updateLanguages', language).success(function(output){
            factory.currUser = output;
            callback(output);
        })
    }

    factory.setLanguage = function(language, id, callback){
        $http.post('/users/' + id + '/setDefaultLanguage', language).success(function(output){
            factory.currUser = output;
            callback(output);
        })
    }


    return factory;
});
