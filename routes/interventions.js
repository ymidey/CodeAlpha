var express = require('express');
var router = express.Router();
const interventions = require("../models/intervention");

// Page racine
router.get("/", async function(req, res, next) {
    interventions.find({}, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.render("interventions", {
                title: "interventions",
                Interventions: result,
            });
            console.log(result);
        }
    });
});

module.exports = router;