var tradeDao = require('../dao/trade_dao');

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
            parasTrade(response);
            var result = {
                            "trades_sold_increment_get_response":
                            {"trades":{"trade":response},"total_results":response.length}
                         };
            rsp.json(result);
        }
    });
}

function parasTrade(trades) {
    trades.forEach(function(trade) {
        if (trade.modified) {
            trade.modified = formatTime(trade.modified);
        }
        if (trade.created) {
            trade.created = formatTime(trade.created);
        }
        if (trade.pay_time) {
            trade.pay_time = formatTime(trade.pay_time);
        }
        if (trade.consign_time) {
            trade.consign_time = formatTime(trade.consign_time);
        }
        if (trade.end_time) {
            trade.end_time = formatTime(trade.end_time);
        }
    });
}

function formatTime(time) {
    time = new Date(time);
    var result = '';
    result = result + time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours()
                + ':' + time.getMinutes() + ':' + time.getSeconds();
    return result;
}

var userMap = {'6200612ffbe9aab17ff9ZZ79024fb434051f9f8d1099f0354520057':54520057}