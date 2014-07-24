exports.handle = function(query, rsp) {
    rsp.json({'taobao_logistics_orders_get_response':
        {'shippings': {'shipping' : [{'out_sid': '123456', 'company_name': '埃里克快递'}]}, 'total_results': 1}
    })
}