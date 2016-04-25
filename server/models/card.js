var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CardSchema = new mongoose.Schema({
    target_language: String,
    target_word: String,
    translated_language: String,
    translations: [],
    tags: [],
    part_of_speech: String,
    contexts: []
},{timestamps: true});

var Card = mongoose.model('Card', CardSchema)
