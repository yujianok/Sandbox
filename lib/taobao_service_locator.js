exports.getService = function(method) {
    var serviceName = serviceMap[method];
    if (serviceName){
        var path = './taobao_service/' + serviceName + '_service';
        return require(path);
    } else {
        console.log('no service for ' + method);
    }
}

var serviceMap = {
    'taobao.trades.sold.increment.get': 'trade_increment',
    'taobao.refunds.receive.get': 'refunds_get',
    'taobao.traderates.get': 'traderates_get',
    'taobao.crm.members.increment.get': 'members_increment',
    'taobao.wangwang.abstract.initialize': 'wangwang_init',
    'taobao.wangwang.eservice.chatpeers.get': 'chatpeers_get',
    'taobao.trade.memo.update': 'trade_memo_update',
    'taobao.logistics.orders.get': 'shipping_order',
    'taobao.trade.get': 'trade_get'
}