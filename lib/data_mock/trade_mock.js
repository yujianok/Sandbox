var customerDao = require('../dao/customer_dao');
var tradeDao = require('../dao/trade_dao')

exports.mock = function(userId, action, tid, params, callback) {
    if (action === 'CREATE') {
        var nick = params[0].nick;
        customerDao.findByUserIdNick(userId, nick, function (error, customer){
            if (error) {
                callback(error);
            } else {
                var trade = createTrade(param, customer);
                tradeDao.save(userId, trade, function(error, response) {
                    if (error) {
                        callback(error);
                    }
                });
            }
        });
    } else if (action == 'PAY') {
        tradeDao.get(userId, tid, function(error, trade) {
            if (error) {
                callback(error);
            } else {
                var now = new Date();
                trade.pay_time = now;
                trade.modified = now;
                trade.status = 'WAIT_SELLER_SEND_GOODS';
                tradeDao.update(userId, tid, trade, function(error, rsp) {
                    if (error) {
                        callback(error);
                    }
                });
            }
        });
    } else if (action == 'CONSIGN') {
        var now = new Date();
        trade.consign_time = now;
        trade.modified = now;
        trade.status = 'WAIT_BUYER_CONFIRM_GOODS';
        tradeDao.update(userId, tid, trade, function(error, rsp) {
            if (error) {
                callback(error);
            }
        });
    } else if (action == 'CONFIRM') {
        var now = new Date();
        trade.end_time = now;
        trade.modified = now;
        trade.status = 'TRADE_FINISHED';
        tradeDao.update(userId, tid, trade, function(error, rsp) {
            if (error) {
                callback(error);
            }
        });
    } else {
        callback(new Error('unsupported action.'));
    }
}

var createTrade = function(params, customer) {
    var trade = {};
    var orders = [];
    var payment = 0;
    for (var param in params) {
        orders.push(createOrder(param));
    }
    var now = new Date();
    trade.orders = orders;
    trade.tid = 'T' + now.getTime();
    trade.title = '测试交易';
    trade.status = 'WAIT_BUYER_PAY';
    trade.payment = payment;
    trade.modified = now;
    trade.created = now;
    trade.receiver_name = customer.realName;
    trade.receiver_mobile = customer.mobile;
    trade.receiver_state = customer.state;
    trade.receiver_city = customer.city;
    trade.receiver_district = customer.district;
    trade.receiver_address = customer.address;
    trade.buyer_rate = false;
    trade.seller_rate = false;
    return trade;
}

var createOrder = function(param) {
    var order = {};
    trade.seller_nick = param.seller_nick;
    order.oid = 'O' + new Date().getTime();
    order.num_iid = param.num_iid;
    order.title = '测试订单';
    order.pic_path = 'http://images.apple.com/cn/macbook-air/images/overview_hero_hero.jpg'；
    order.refund_status = 'NO_REFUND';
    order.nick = param.nick;
    trade.nick = param.nick;
    order.sku_id = param.sku_id;
    order.price = param.price;
    order.payment = param.payment;
    payment = payment + param.payment;
    order.num = param.num;
    order.buyer_rate = false;
    order.seller_rate = false;
    return order;
}
