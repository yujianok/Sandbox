var esDao = require('./elasticsearch_dao');

exports.findByUserIdNick = function(userId, nick, callback) {
    var query = {'conditions': [{'comparator': 'eq', 'name': 'nick', 'value': nick}]};
    esDao.find(userId, 'CustomerEs', query, function (error, result) {
        if (error) {
            callback(error);
        } else {
            callback(error, result[0]);
        }
    });
}