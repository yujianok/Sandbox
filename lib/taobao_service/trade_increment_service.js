var tradeDao = require('../dao/trade_dao');
var tradeUtils = require('../utils/trade_utils');

exports.handle = function(query, rsp) {
    var session = query.session;
    var userId = userMap[session] | 0;
    var start = query.start_modified;
    var end = query.end_modified;
    start = new Date(start).getTime();
    end = new Date(end).getTime();
    var q = {};
    q.from = 0;
    q.size = 100;
    q.conditions = [
        {name: 'userId', value: userId, comparator: 'eq'},
        {name: 'modified', value: start, comparator: 'gte'},
        {name: 'modified', value: end, comparator: 'lte'}
    ];
    tradeDao.find(q, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            tradeUtils.parasTrade(response);
            var result = {
                            "trades_sold_increment_get_response":
                            {"trades":{"trade":response},"total_results":response.length}
                         };
            rsp.json(result);
        }
    });
}

var userMap = {'6200612ffbe9aab17ff9ZZ79024fb434051f9f8d1099f0354520057':54520057}