// the  variable mongoose let me use mongoose functionnalitys.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// mongoose shema declaration
// I create a new mongoose shema figure that has severals prorieties that defines it
var figureSchema = new Schema({
    nom: String,
    univers: String,
    picture: String,
    price: Number,
    // user id that created it
    creator: String
});

// I export my model so that i can use it outside this file
module.exports = mongoose.model('Figure', figureSchema);
