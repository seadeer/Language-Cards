var users = require('../controllers/users');
var cards = require('../controllers/cards');

module.exports = function(app){

    app.post('/login', function(req, res){
      users.login(req, res);  
    });
    
    app.get('/users/:id/cards/index', function(req, res){
        cards.indexByUser(req, res);
    })

    app.get('/cards/index5', function(req, res){
        cards.indexFive(req, res);
    })

    app.post('/cards/new', function(req, res){
        cards.create(req, res);
    })
}
