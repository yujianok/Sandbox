var tradeDao = require('../dao/trade_dao');

exports.handle = function(query, rsp) {
    var tid = query.tid;
    var flag = query.flag;
    var memo = query.memo;
    var query = {from: 0, size: 10, conditions: [{name: 'tid', value: tid, comparator: 'eq'}]};
    tradeDao.find(query, function(error, response) {
        var trade = response[0];
        if (trade) {
            trade.buyer_flag = flag;
            trade.buyer_memo = memo;
            trade.modified = new Date().getTime();
            console.log('trade ' + tid + ' add flag & memo');
            tradeDao.update(trade, function(error, updateRsp) {
                rsp.json({'taobao_trade_memo_update_response': {'trade': {}}});
            });
        }
    });
}