const mongoose = require('mongoose');
const Figure = require('./figures');
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: String,
    password: String,
    Usercollection: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Figure'
    }]
})
module.exports = mongoose.model('User', userSchema, 'users')