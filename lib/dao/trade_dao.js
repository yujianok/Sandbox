var esDao = require('./elasticsearch_dao');

var type = 'TradeTest';

var userId = 'sandbox';

exports.save = function(trade, callback) {
    esDao.create(userId, type, trade, function(error, rsp) {
        if (callback) {
            callback(error, rsp);
        }
    });
}

exports.get = function(tradeId, callback) {
    esDao.get(userId, type, tradeId, function(error, rsp) {
        if (callback) {
            callback(error, rsp);
        }
    });
}

exports.update = function(trade, callback) {
    esDao.update(userId, type, trade.id, trade, function(error, rsp) {
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