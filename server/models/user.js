var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
    name: String,
    score: Number,
    rank: String,
    challenges: [{type: Schema.ObjectId, ref: 'Challenge'}],
    decks: [{type: Schema.ObjectId, ref: 'Deck'}],
    languages: [{type: Schema.ObjectId, ref: 'Language'}],
    default_language: {type: String, default: 'English'},
}, {timestamps: true});

var User = mongoose.model('User', UserSchema);
