var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var locator = require('./taobao_service_locator.js');

router.use(bodyParser.json());

router.use(function(req, res, next){
    res.set({'Content-Type': 'application/json; charset=utf-8'});
    next();
});

router.post('', function(req, res) {
    var query = req.query;
    var method = query.method;
    var service = locator.getService(method);
    if (service) {
        service.handle(query, res);
    }
});

router.get('', function(req, res) {
    var query = req.query;
    var method = query.method;
    var service = locator.getService(method);
    if (service) {
        service.handle(query, res);
    }
});

module.exports = router;