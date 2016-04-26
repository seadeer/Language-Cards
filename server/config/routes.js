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
	//  this is for scraping forvo for our translation data without needing to use their api
	//  app.get('/scrape', function(req, res){
	//      url = 'http://www.forvo.com/english-spanish/search?source=auto&query=brain';
	 //
	//      // The structure of our request call
	//      // The first parameter is our URL
	//      // The callback function takes 3 parameters, an error, response status code and the html
	 //
	//      req(url, function(err, res, html){
	// 		  //check for errors
	//          if(!error){
	//              // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
	//             var element = document.getElementsByClassName('exact')
	// 				console.log('this is data, ', exact)
	//          }
	//      })
	//  })
}
