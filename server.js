var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var paths = require('./server/config/paths')
var app = express();

app.use(express.static(path.join(__dirname + '/client/')));
app.use(express.static(path.join(__dirname + "/node_modules/")));
app.use(express.static(paths.imagePath));
app.use(bodyParser.json());


require("./server/config/mongoose.js");
require("./server/config/routes.js")(app);







port = 8000;
app.listen(port, function(){
    console.log("Running on port 8000");
})
