var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CardSchema = new mongoose.Schema({
    target_language: String,
    target_word: String,
    translated_language: String,
    translations: [],
    tags: [],
    part_of_speech: String,
    contexts: [],
    _creator: {type: Schema.ObjectId, ref: 'User'}
},{timestamps: true});

var DeckSchema = new mongoose.Schema({
    name: String,
    target_language: String,
    cards: [CardSchema],
    _user: {type: Schema.ObjectId, ref: 'User'}
}, {timestamps: true});

var Deck = mongoose.model('Deck', DeckSchema);
