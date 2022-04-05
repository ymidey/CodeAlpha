var express = require('express');
var router = express.Router();
var qrcode = require("qrcode");
var intervention = require('../models/intervention');
const nodemailer = require("nodemailer");
const logger = require('./logger.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('createqr', { title: 'CodeAlpha', saisie: true });
});

router.post("/scan", (req, res, next) => {
    let input_identite = req.body.identite;
    let input_code = req.body.code;
    let input_salle = req.body.salle;
    let input_horaire_debut = req.body.horaireEntree;
    let input_entree_reelle = "-";
    let input_sortie_reelle = "-";
    let contenuQR = input_identite + "\n" + input_code + "\n" + input_salle + "\n" + input_horaire_debut;

    let interventions = new intervention({ heureDebutPrevu: input_horaire_debut, salle: input_salle, code: input_code, identite: input_identite, heureEntreeReelle: input_entree_reelle, heureSortieReelle: input_sortie_reelle });
    interventions.save(function(err, interventions) {
        if (err) return console.error(err);
        console.log(interventions.name + " saved to bookstore collection.");
    });
    qrcode.toDataURL(contenuQR, (err, src) => {
        if (err) {
            res.send("Un problème est survenu !!!");
            logger.error('Error message');
        }

        var transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "5bd491f8d6dc20",
                pass: "d8b17bf2561cc0"
            }
        });

        let mailOptions = {
            from: 'qrident@exemple.com',
            to: input_code + '@gmail.com',
            subject: "QRCode",
            text: "Envoi de QRCode",
            html: 'QRCode de "' + input_identite + '" : <img src="' + src + '"/>',
            attachments: [{
                filename: src,
                cid: src // Mettre à l'identique img src
            }]
        };

        transport.sendMail(mailOptions, function(error, info) {
            if (error) {
                logger.error("mail pas bien envoyé");
                console.log(error);
            } else {
                logger.info("mail bien envoyé");
                console.log('Email sent: ' + info.response);
            }
        });

        logger.info(input_identite, input_horaire_debut, input_code, input_salle);

        res.render("createqr", {
            title: "Générateur QR Code",
            saisie: false,
            qr_code: src
        });
    });
});

module.exports = router;