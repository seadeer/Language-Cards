var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
    name: String,
    score: Number,
    rank: String,
    challenges: [{type: Schema.ObjectId, ref: 'Challenge'}],
    decks: [{type: Schema.ObjectId, ref: 'Deck'}],
    languages: [{type: Schema.ObjectId, ref: 'Language'}],
    default_language: {type: Schema.ObjectId, ref: 'Language', default: "571f6f34b984b38d2e799ef4"},
}, {timestamps: true});

var User = mongoose.model('User', UserSchema);
