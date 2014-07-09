var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.use(function(req, res, next){
    res.set({'Content-Type': 'application/json; charset=utf-8'});
    next();
});

router.post('', function(req, res) {
    var query = req.query;
    var method = query.method;
});

module.exports = router;