exports.parasTrade = function(trades) {
    trades.forEach(function(trade) {
        if (trade.modified) {
            trade.modified = formatTime(trade.modified);
        }
        if (trade.created) {
            trade.created = formatTime(trade.created);
        }
        if (trade.pay_time) {
            trade.pay_time = formatTime(trade.pay_time);
        }
        if (trade.consign_time) {
            trade.consign_time = formatTime(trade.consign_time);
        }
        if (trade.end_time) {
            trade.end_time = formatTime(trade.end_time);
        }
    });
}

exports.formatTime = formatTime;

function formatTime(time) {
    time = new Date(time);
    var result = '';
    result = result + time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours()
                + ':' + time.getMinutes() + ':' + time.getSeconds();
    return result;
}