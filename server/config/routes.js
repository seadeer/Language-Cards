var users = require('../controllers/users');

module.exports = function(app){

    app.post('/login', function(req, res){
      users.login(req, res);  
    });
    
}
