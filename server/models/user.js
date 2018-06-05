const mongoose = require('mongoose');
// I import the figure model
const Figure = require('./figures');
const Schema = mongoose.Schema

// my user model has an array of figure id.
// this type doesn't exist so I need to create id with the reference exported
const userSchema = new Schema({
    email: String,
    password: String,
    Usercollection: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Figure'
    }]
})
module.exports = mongoose.model('User', userSchema, 'users')