var mysqlUtils = require('../dao/mysql_utils');
var esDao = require('../dao/elasticsearch_dao');

exports.delete = function(user, type, id, callback) {
    console.log(JSON.stringify(callback));
    console.log('try to delete user send data. user: ' + id);
    var pool = mysqlUtils.getPool();
    pool.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            connection.query( 'delete from action_record where user_id = ' + id, function(err, rows) {
                if (err) {
                    console.log(err);
                    callback(err);
                } else {
                    connection.query( 'delete from campaign_instance where user_id = ' + id, function(err, rows) {
                        connection.release();
                        if (err) {
                            console.log(err);
                            callback(err);
                        } else {
                            esDao.client.deleteByQuery({
                                index: id.toString(),
                                type: 'CampaignResult',
                                body: {query: {term: {userId: id}}}
                            }, function (error, response) {
                                if (error) {
                                    console.log(error);
                                    callback(error);
                                } else {
                                    esDao.client.deleteByQuery({
                                        index: id.toString(),
                                        type: 'Trade',
                                        body: {query: {term: {userId: id}}}
                                    }, function(error, response) {
                                        if (error) {
                                            console.log(error);
                                            callback(error);
                                        } else {
                                            esDao.client.deleteByQuery({
                                                index: id.toString(),
                                                type: 'Order',
                                                body: {query: {term: {userId: id}}}
                                            }, function(error, response) {
                                                if (error) {
                                                    console.log(error);
                                                    callback(error);
                                                } else {
                                                    callback();
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}