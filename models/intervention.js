const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Interventions = new Schema({
    heureDebutPrevu: Date,
    salle: String,
    code: String,
    identite: String,
    heureEntreeReelle: String,
    heureSortieReelle: String,
})
module.exports = mongoose.model('Interventions', Interventions, 'Interventions');