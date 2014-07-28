var dataConfig = require('../data_config');
var refundDao = require('../dao/refund_dao');
var tradeUtils = require('../utils/trade_utils');

exports.handle = function(query, rsp) {
    var session = query.session;
    var userId = dataConfig.sessionToUserId[session] | 0;
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
    refundDao.find(q, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            response.forEach(function(refund) {
                refund.modified = tradeUtils.formatTime(refund.modified);
            });
            var result = {
                            'taobao_refunds_receive_get_response': {
                                'refunds': {'refund' : response},
                                'total_results': 0,
                                'has_next': false
                            }
                         };
            rsp.json(result);
        }
    });
}