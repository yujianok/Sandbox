var esDao = require('./elasticsearch_dao');

exports.save = function(userId, trade, callback) {
    esDao.create(userId, 'TradeTest', trade, callback);
}