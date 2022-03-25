var express = require('express');
var router = express.Router();

/* GET interventions. */
router.get('/', function(req, res, next) {
    res.render('interventions', { title: 'CodeAlpha', saisie: true });
});

module.exports = router;