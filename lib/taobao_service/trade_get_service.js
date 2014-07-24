var tradeDao = require('../dao/trade_dao');
var tradeUtils = require('../utils/trade_utils');

exports.handle = function(query, rsp) {
    var tid = query.tid;
    var q = {};
        q.from = 0;
        q.size = 100;
        q.conditions = [{name: 'tid', value: tid, comparator: 'eq'}];
    tradeDao.find(q, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            tradeUtils.parasTrade(response);
            var trade = response[0] | {};
            var result = {"taobao_trade_get_response": {"trade": trade}};
            rsp.json(result);
        }
    });
}
