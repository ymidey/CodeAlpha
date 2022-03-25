var express = require('express');
var router = express.Router();
var qrcode = require("qrcode");
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('createqr', { title: 'CodeAlpha', saisie: true });
});

router.post("/scan", (req, res, next) => {
    let input_identite = req.body.identite;
    let input_code = req.body.code;

    let input_salle = req.body.salle;
    let input_horaire_debut = req.body.horaireEntree;
    let input_horaire_fin = req.body.horaireSortie;
    let contenuQR = input_identite + "\n" + input_code + "\n" + input_salle + "\n" + input_horaire_debut + "\n" + input_horaire_fin;

    qrcode.toDataURL(contenuQR, (err, src) => {
        if (err) res.send("Un problème est survenu !!!");
        res.render("createqr", {
            title: "Générateur QR Code",
            saisie: false,
            qr_code: src
        });
    });
});

module.exports = router;