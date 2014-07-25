var mysql = require('mysql');
var config = require('../../config');

var pool = null

exports.getPool = function() {
    if (!pool) {
        pool = mysql.createPool(config.mysql);
    }
    return pool;
}
