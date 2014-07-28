var customerDao = require('../dao/customer_dao');
var tradeDao = require('../dao/trade_dao');
var refundDao = require('../dao/refund_dao');

exports.mock = function(action, t) {
    if (action === 'create') {
        var trade = createTrade(t);
        tradeDao.save(trade);
    } else if (action === 'create_refund') {
        tradeDao.get(t.tid, function(error, trade) {
            var refund = createRefund(t.tid, trade);
            refundDao.save(refund);
        });
    } else if (action === 'wait_buyer_send_goods') {
        refundDao.get(t.tid, function(error, refund) {
            var now = new Date();
            refund.modified = now.getTime();
            refund.status = 'WAIT_BUYER_RETURN_GOODS';
            refundDao.update(refund);
        });
    } else if (action === 'wait_seller_confirm_goods') {
        refundDao.get(t.tid, function(error, refund) {
            var now = new Date();
            refund.modified = now.getTime();
            refund.status = 'WAIT_SELLER_CONFIRM_GOODS';
            refundDao.update(refund);
        });
    } else if (action === 'refund_success') {
        refundDao.get(t.tid, function(error, refund) {
            var now = new Date();
            refund.modified = now.getTime();
            refund.status = 'SUCCESS';
            refundDao.update(refund);
        });
    } else if (action === 'refund_refuse') {
        refundDao.get(t.tid, function(error, refund) {
            var now = new Date();
            refund.modified = now.getTime();
            refund.status = 'SELLER_REFUSE_BUYER';
            refundDao.update(refund);
        });
    } else {
        tradeDao.get(t.tid, function(error, trade) {
            var now = new Date();
            if (action === 'pay') {
                trade.pay_time = now.getTime();
                trade.modified = now.getTime();
                trade.status = 'WAIT_SELLER_SEND_GOODS';
                setOrderStatus(trade);
            } else if (action === 'consign') {
                trade.consign_time = now.getTime();
                trade.modified = now.getTime();
                trade.status = 'WAIT_BUYER_CONFIRM_GOODS';
                setOrderStatus(trade);
            } else if (action === 'end') {
                trade.end_time = now.getTime();
                trade.modified = now.getTime();
                trade.status = 'TRADE_FINISHED';
                setOrderStatus(trade);
            } else if (action === 'close_by_taobao') {
                trade.end_time = now.getTime();
                trade.modified = now.getTime();
                trade.status = 'TRADE_CLOSED_BY_TAOBAO';
            } else {
                console.log(new Error('unsupported action:' + action));
                return;
            }
            tradeDao.update(trade, function(error, rsp) {
                if (error) {
                    console.log(error);
                }
            });
        });
    }
}

var createTrade = function(t) {
    var now = new Date();
    var customer = t.customer;
    var trade = {};
    var orders = {};
    orders.order = [];
    var payment = 0;
    trade.orders = orders;
    trade.id = t.tid;
    trade.tid = now.getTime();
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
    trade.buyer_nick = t.buyerNick;
    trade.userId = t.userId;

    var payment = 0;

    var os = t.orders;
    var orderIndex = 0;
    t.orders.forEach(function(order) {
        orders.order.push(createOrder(trade, orderIndex, order));
        if (order.payment) {
            payment = payment + order.payment;
        } else {
            payment = payment + order.price * order.num;
        }
        orderIndex++;
    });
    trade.payment = payment;
    trade.received_payment = 0;
    trade.post_fee = 0;
    return trade;
}

var createOrder = function(trade, orderIndex, o) {
    var order = {};
    order.oid = parseInt(trade.id + '' + orderIndex);
    order.num_iid = o.numIId;
    order.title = o.title;
    order.pic_path = 'http://images.apple.com/cn/macbook-air/images/overview_hero_hero.jpg';
    order.refund_status = 'NO_REFUND';
    order.buyer_nick = trade.buyer_nick;
    order.price = o.price;
    if (o.payment) {
        order.payment = o.payment;
    } else {
        order.payment = o.price * o.num;
    }
    order.num = o.num;
    order.buyer_rate = false;
    order.seller_rate = false;
    order.status = trade.status;
    return order;
}

function setOrderStatus(trade) {
    trade.orders.order.forEach(function(order) {
        order.status = trade.status;
    });
}

function createRefund(id, trade) {
    var now = new Date();
    var refund = {};
    refund.id = id;
    refund.refund_id = now.getTime();
    refund.tid = trade.tid;
    refund.oid = trade.tid;
    refund.buyer_nick = trade.buyer_nick;
    refund.seller_nick = trade.seller_nick;
    refund.order_status = trade.status;
    refund.status = 'WAIT_SELLER_AGREE';
    refund.refund_fee = trade.payment;
    refund.reason = '我要退款';
    refund.desc = '测试退款';
    refund.modified = now.getTime();
    return refund;
}
