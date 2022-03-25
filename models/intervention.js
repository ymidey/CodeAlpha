const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Intervenants = new Schema({
    nom: String,
    prenom: String,
    code: String,
    mail: String,
    poste: String,
})
module.exports = mongoose.model('Intervenants', Intervenants, 'Intervenants');