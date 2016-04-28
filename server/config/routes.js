var users = require('../controllers/users');
var cards = require('../controllers/cards');

module.exports = function(app){

    app.post('/login', function(req, res){
      users.login(req, res);
    });

    app.get('/users/:id/cards/index', function(req, res){
        cards.indexByUser(req, res);
    });

    app.get('/cards/index5', function(req, res){
        cards.indexFive(req, res);
    });

    app.get('/cards/index/:id', function(req, res){
        cards.index(req, res);
    });

    app.post('/cards/new', function(req, res){
        cards.create(req, res);
    });

    app.get('/languages/index', function(req, res){
        console.log("got request to index languages");
        users.indexLang(req, res);
    });

    app.get('/decks/:id', function(req, res){
        console.log("got request from factory on decks", req.body);
        cards.indexDeck(req, res);
    })

    app.post('/users/:id/updateLanguages', function(req, res){
        users.addLanguage(req, res);
    });

    app.post('/users/:id/setDefaultLanguage', function(req, res){
        users.setLanguage(req, res);
    });

    app.post('/users/:id/decks/new', function(req, res){
        cards.createDeck(req, res);
    });

    app.get('/users/:id', function(req, res){
        users.index(req, res);
    });

    app.post('/decks/:id', function(req, res){
        cards.addToDeck(req, res);
    });

    app.post('/cards/playSound', function(req, res){
        cards.playSound(req, res);
    })

    app.post('/pixaimgsearch/', function(req, res){
        cards.imgSearch(req, res);
    })
};
