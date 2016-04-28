var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CardSchema = new mongoose.Schema({
    target_language: String,
	 language_code: String, 
    target_word: String,
	 image_url: String,
    translated_language: String,
    translations: [],
    tags: [],
    part_of_speech: String,
    contexts: [],
    _creator: {type: Schema.ObjectId, ref: 'User'}
},{timestamps: true});

var Card = mongoose.model('Card', CardSchema);
