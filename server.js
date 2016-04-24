var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var app = express();

app.use(express.static(path.join(__dirname + '/client/')));
app.use(express.static(path.join(__dirname + "/node_modules/")));

require("./server/config/mongoose.js");
require("./server/config/routes.js")(app);

port = 8000;
app.listen(port, function(){
    console.log("Running on port 8000");
})


