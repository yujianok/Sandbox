
var elasticsearchDao = require('../dao/elasticsearch_dao');

exports.get = function(user, type, id, callback) {
    console.log('Retrieved');
    elasticsearchDao.get(user, type, id, callback);
}

exports.find = function(user, type, query, callback) {
    console.log('Queried');
    elasticsearchDao.find(user, type, query, callback);
}

exports.create = function(user, type, entity, callback) {
    console.log('Created');
    elasticsearchDao.create(user, type, entity, callback);
    elasticsearchDao.refresh(user, callback);
}

exports.update = function(user, type, id, entity, callback) {
    console.log('Updated');
    elasticsearchDao.update(user, type, id, entity, callback);
    elasticsearchDao.refresh(user, callback);
}

exports.delete= function(user, type, id, callback) {
    console.log('Deleted');
    elasticsearchDao.delete(user, type, id, callback);
    elasticsearchDao.refresh(user, callback);
}