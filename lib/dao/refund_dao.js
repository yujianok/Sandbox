var esDao = require('./elasticsearch_dao');

var type = 'RefundTest';

var userId = 'sandbox';

exports.save = function(refund, callback) {
    esDao.create(userId, type, refund, function(error, rsp) {
        if (callback) {
            callback(error, rsp);
        }
    });
}

exports.get = function(refundId, callback) {
    esDao.get(userId, type, refundId, function(error, rsp) {
        if (callback) {
            callback(error, rsp);
        }
    });
}

exports.update = function(refund, callback) {
    esDao.update(userId, type, refund.id, refund, function(error, rsp) {
        if (callback) {
            callback(error, rsp);
        }
    });
}

exports.find = function(query, callback) {
    esDao.find(userId, type, query, function(error, rsp) {
        if (callback) {
            callback(error, rsp);
        }
    });
}