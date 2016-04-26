var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DeckSchema = new mongoose.Schema({
    name: String,
    target_language: String,
    cards: [{type: Schema.ObjectId, ref: 'Card'}],
    _user: {type: Schema.ObjectId, ref: 'User'}
}, {timestamps: true});

var Deck = mongoose.model('Deck', DeckSchema);
