var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LanguageSchema = new mongoose.Schema({
    name: String,
    abbreviation: String
});

var Language = mongoose.model('Language', LanguageSchema);
