
var config = require('../../config');

var client = require('elasticsearch').Client({
    hosts: config.es.hosts
});

exports.create = function (user, type, entity, callback) {
    client.index({
          index: user,
          type: type,
          body: entity
    }, function (error, response) {
        if (callback) {
            callback(error, response);
        }
    });

}

exports.get = function (user, type, id, callback) {
    client.getSource({
      index: user,
      type: type,
      id: id
    }, function (error, response) {
        if(callback) {
            callback(error, response);
        }
    });
}

exports.update = function (user, type, id, entity, callback) {
    client.update({
      index: user,
      type: type,
      id: id,
      body: {
        doc: entity
      }
    }, function (error, response) {
        if(callback) {
            callback(error, response);
        }
    })

}

exports.find = function (user, type, query, callback) {
    client.search({
            index: user,
            type: type,
            from: query.from,
            size: query.size,
            body: transformQuery(user, query)
        }, function (error, response) {
            if(callback) {
                if (error) {
                    callback(error);
                } else {
                    var result = [];
                    for (var i in response.hits.hits) {
                        result.push(response.hits.hits[i]._source);
                    }

                    callback(error, result);
                }
            }
    });
}

exports.count = function (user, type, query, callback) {
    client.count({
            index: user,
            type: type,
            body: transformQuery(user, query)
        }, function (error, response) {
            if(callback) {
                if (error) {
                    callback(error);
                } else {
                    callback(error, response.hits.total)
                }
            }
    });
}

exports.delete = function (user, type, id, callback) {
       client.delete({
               index: user,
               type: type,
               id: id
           }, function (error, response) {
               if(callback) {
                    callback(error, response);
               }
       });
}

function transformQuery(user, query) {
    var filters = [{match_all: {}}];
    query.conditions.forEach(function(condition) {
        if (condition.comparator == null || condition.comparator == 'eq') {
            var filter = {term: {}};
            filter.term[condition.name] = condition.value;
            filters.push(filter);
        } else if (condition.comparator == 'gt') {
            var filter = {range: {}}
            filter.range[condition.name] = {gt: condition.value};
            filters.push(filter);
        } else if (condition.comparator == 'lt') {
            var filter = {range: {}}
            filter.range[condition.name] = {lt: condition.value};
            filters.push(filter);
        } else if (condition.comparator == 'gte') {
            var filter = {range: {}}
            filter.range[condition.name] = {gte: condition.value};
            filters.push(filter);
        } else if (condition.comparator == 'lte') {
            var filter = {range: {}}
            filter.range[condition.name] = {lte: condition.value};
            filters.push(filter);
        }
    });

    return {filter: {and: filters}};
}