var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
    name: String,
    score: Number,
    rank: String,
    challenges: [{type: Schema.ObjectId, ref: 'Challenge'}],
    cards: [{type: Schema.ObjectId, ref: 'Card'}],
    languages: [],
    default_language: {type: String, default: 'English'},
}, {timestamps: true});

var User = mongoose.model('User', UserSchema)
