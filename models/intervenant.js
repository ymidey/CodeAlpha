const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Intervenants = new Schema({
    identite: String,
    code: String,
    mail: String,
    poste: String,
})
module.exports = mongoose.model('Intervenants', Intervenants, 'Intervenants');