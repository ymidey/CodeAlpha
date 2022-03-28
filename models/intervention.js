const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Interventions = new Schema({
    heureDebutReel: Date,
    heureFinReel: Date,
    salle: String,
    code: String,
    identite: String,
})
module.exports = mongoose.model('Interventions', Interventions, 'Interventions');