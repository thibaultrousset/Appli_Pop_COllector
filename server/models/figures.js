// La variable mongoose nous permettra d'utiliser les fonctionnalités du module mongoose.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//var db = require('/home/rousset/workspace/projet/API_NodeJS_Express/back/app');

var figureSchema = new Schema({
    nom: String,
    univers: String,
    picture: String,
    price: Number,
    creator: String
});

module.exports = mongoose.model('Figure', figureSchema);

//module.exports = Piscine;