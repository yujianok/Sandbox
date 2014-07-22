exports.handle = function(query, rsp) {
    rsp.json({'taobao_traderates_get_response': {'trade_rates': {'trade_rate' : []}, 'total_results': 0, 'has_next': false}})
}