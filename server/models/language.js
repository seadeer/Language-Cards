var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LanguageSchema = new mongoose.Schema({
    name: String,
    abbreviation: String,
	 country: String,
	 welcome: String, 
});

var Language = mongoose.model('Language', LanguageSchema);
