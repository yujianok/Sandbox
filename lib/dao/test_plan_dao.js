var esDao = require('./elasticsearch_dao');

var type = 'TestPlan';

var userId = 'sandbox'

exports.getAllPlans = function(query, callback) {
    esDao.find(userId, type, query, callback);
}

exports.updatePlan = function(plan, callback) {
    esDao.update(userId, type, plan.id, plan, function(e, r) {
        if (callback) {
            callback(e,r);
        }
    });
}