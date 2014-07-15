var esDao = require('./elasticsearch_dao');

var type = 'TradeTest';

exports.save = function(userId, trade, callback) {
    esDao.create(userId, type, trade, callback);
}

exports.get = function(userId, tradeId, callback) {
    esDao.get(userId, type, tradeId, function(error, rsp) {
        if (error) {
            callback(error);
        } else {
            callback(error, rsp.source);
        }
    });
}

exports.update = function(userId, tradeId, trade, callback) {
    esDao.update(userId, type, tradeId, trade, callback);
}