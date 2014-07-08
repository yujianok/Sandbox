var express = require('express');
var bodyParser = require('body-parser');
var managerLocator = require('./manager_locator');

var conditionPattern = new RegExp('([\\\w]+)[:]?([eq|gt|lt|gte|lte]?)');
var router = express.Router();

router.use(bodyParser.json());

router.post('/:user/:type', function(req, res) {
    var user = req.params.user;
    var type = req.params.type;

    var manager = managerLocator.getManager(type);
    manager.create(user, type, req.body, function(error, result){
        if (error) {
            res.send(400, error);
        } else {
            res.json(result);
        }
    });

});

router.put('/:user/:type/:id', function(req, res) {
    var user = req.params.user;
    var type = req.params.type;
    var id = req.params.id;

    var manager = managerLocator.getManager(type);
    manager.update(user, type, id, req.body, function(error, result){
        if (error) {
            res.send(400, error);
        } else {
            res.json(result);
        }
    });
});

router.get('/:user/:type/:id', function(req, res) {
    var user = req.params.user;
    var type = req.params.type;
    var id = req.params.id;

    var manager = managerLocator.getManager(type);
    manager.get(user, type, id, function(error, result){
        if (error) {
            res.send(404, error);
        } else {
            res.json(result);
        }
    });

});

router.get('/:user/:type', function(req, res){
    var user = req.params.user;
    var type = req.params.type;
    var query = {
        paged: req.query._paged | true,
        from: req.query._from | 0,
        size: req.query._size | 10,
        conditions: []
    };

    for(var key in req.query) {
        if (key.indexOf('_') == 0) {
            continue;
        }
        var paramCondition = conditionPattern.exec(key);
        if (paramCondition) {
            var comparator = paramCondition[2] ? paramCondition[2] : 'eq';
            query.conditions.push({name: paramCondition[1], comparator: comparator, value: req.query[key]});
        }
    }

    var manager = managerLocator.getManager(type);
    manager.find(user, type, query, function(error, result){
        if (error) {
            res.send(400, error);
        } else {
            res.json(result);
        }
    });

});

router.delete('/:user/:type/:id', function(req, res) {
    var user = req.params.user;
    var type = req.params.type;
    var id = req.params.id;

    var manager = managerLocator.getManager(type);
    manager.delete(user, type, id, function(error, result){
        if (error) {
            res.send(400, error);
        } else {
            res.json(result);
        }
    });

});

module.exports = router;
