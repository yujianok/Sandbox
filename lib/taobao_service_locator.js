exports.getService = function (method) {
    var path = './taobao_service/' + serviceMap[method] + '_service';
    return require(path);
}

var serviceMap = {
    'taobao.trades.sold.increment.get': 'trade_increment'
}