var express = require('express');
var router = express.Router();
const Intervenants = require("../models/Intervenant");


// Page racine
router.get("/", async function(req, res, next) {
    Intervenants.find({}, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.render("Intervenants", {
                title: "Intervenant",
                Intervenants: result,
            });
            console.log(result);
        }
    });
});

module.exports = router;