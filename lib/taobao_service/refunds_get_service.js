exports.handle = function(query, rsp) {
    rsp.json({'taobao_refunds_receive_get_response': {'refunds': {'refund' : []}, 'total_results': 0, 'has_next': false}})
}