var mysqlUtils = require('../dao/mysql_utils');
var esDao = require('../dao/elasticsearch_dao');

exports.delete = function(user, type, id, callback) {
    var pool = mysqlUtils.getPool;
    pool.getConnection(function(err, connection) {
        connection.query( 'delete from action_record where user_id = ' + id, function(err, rows) {
            if (err) {
                callback(err);
            } else {
                connection.query( 'delete from action_record where user_id = ' + id, function(err, rows) {
                    if (err) {
                        callback(err);
                    } else {
                     esDao.client.deleteByQuery({
                        index: id.toString(),
                        type: 'CampaignResult',
                        body: {query: {term: {userId: id}}}
                     }, function (error, response) {
                        if (error) {
                            callback(error);
                        } else {
                            callback(null);
                        }
                     });
                    }
                    connection.release();
                });
            }
        });
    });
}