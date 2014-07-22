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
    'taobao.trades.sold.increment.get': 'trade_increment'
}