var esDao = require('../dao/elasticsearch_dao');
var job = require('../job/trade_mock_job')

exports.update = function(user, type, id, entity, callback) {
    esDao.update(user, type, id, entity, callback);
    esDao.get(user, type, id, function(error, rsp) {
        job.schedulePlan(rsp);
    });
}