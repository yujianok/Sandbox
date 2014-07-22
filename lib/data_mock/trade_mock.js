var customerDao = require('../dao/customer_dao');
var tradeDao = require('../dao/trade_dao')

exports.mock = function(action, t) {
    if (action === 'create') {
        var trade = createTrade(t);
        tradeDao.save(trade);
    } else if (action == 'pay') {
        tradeDao.get(t.tid, function(error, trade) {
            if (error) {
                console.log(error);
            } else {
                var now = new Date();
                trade.pay_time = now.getTime();
                trade.modified = now.getTime();
                trade.status = 'WAIT_SELLER_SEND_GOODS';
                tradeDao.update(trade, function(error, rsp) {
                    if (error) {
                        console.log(error);
                    }
                });
            }
        });
    } else if (action == 'consign') {
        tradeDao.get(t.tid, function(error, trade) {
            var now = new Date();
            trade.consign_time = now.getTime();
            trade.modified = now.getTime();
            trade.status = 'WAIT_BUYER_CONFIRM_GOODS';
            tradeDao.update(userId, tid, trade, function(error, rsp) {
                if (error) {
                    console.log(error);
                }
            });
        });
    } else if (action == 'end') {
        tradeDao.get(t.tid, function(error, trade) {
            var now = new Date();
            trade.end_time = now.getTime();
            trade.modified = now.getTime();
            trade.status = 'TRADE_FINISHED';
            tradeDao.update(userId, tid, trade, function(error, rsp) {
                if (error) {
                    callback(error);
                }
            });
        });
    } else {
        console.log(new Error('unsupported action.'));
    }
}

var createTrade = function(t) {
    var now = new Date();
    var customer = t.customer;
    var trade = {};
    var orders = [];
    var payment = 0;
    trade.orders = orders;
    trade.id = t.tid;
    trade.tid = t.tid;
    trade.title = '测试交易';
    trade.status = 'WAIT_BUYER_PAY';
    trade.modified = now.getTime();
    trade.created = now.getTime();
    trade.receiver_name = customer.realName;
    trade.receiver_mobile = customer.mobile;
    trade.receiver_state = customer.state;
    trade.receiver_city = customer.city;
    trade.receiver_district = customer.district;
    trade.receiver_address = customer.address;
    trade.buyer_rate = false;
    trade.seller_rate = false;
    trade.seller_nick = t.sellerNick;
    trade.nick = t.buyerNick;
    trade.userId = t.userId;

    var payment = 0;

    var os = t.orders;
    var orderIndex = 0;
    t.orders.forEach(function(order) {
        orders.push(createOrder(trade, orderIndex, order));
        payment = payment + order.price * order.num;
        orderIndex++;
    });
    trade.payment = payment;
    return trade;
}

var createOrder = function(trade, orderIndex, o) {
    var order = {};
    order.oid = parseInt(trade.id + '' + orderIndex);
    order.num_iid = o.num_iid;
    order.title = o.title;
    order.pic_path = 'http://images.apple.com/cn/macbook-air/images/overview_hero_hero.jpg';
    order.refund_status = 'NO_REFUND';
    order.nick = trade.nick;
    order.price = o.price;
    order.payment = o.price * o.num;
    order.num = o.num;
    order.buyer_rate = false;
    order.seller_rate = false;
    return order;
}
