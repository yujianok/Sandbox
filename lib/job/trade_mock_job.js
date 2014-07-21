var testPlanDao = require('../dao/test_plan_dao');
var tradeMock = require('../data_mock/trade_mock');

exports.doJob = setInterval(function() {
    var query = {from: 0, size: 100000, conditions: [{name: 'status', value: true, comparator: 'eq'}]};
    testPlanDao.getAllPlans(query, function(error, rsp) {
        if (!error) {
            var now = new Date().getTime();
            rsp.forEach(function(plan) {
                var planId = plan.id;
                console.log('found plan: ' + planId);
                var startTime = plan.startTime;
                console.log('now: ' + now);
                console.log('startTime: ' + startTime);
                if ((startTime + 10 * 1000) >= now) {
                    var trades = plan.trades;
                    var actions = plan.actions;
                    actions.forEach(function(action) {
                        var trade = getTradeByTid(action.tid, trades);
                        schedule(startTime, now, action, trade);
                    });
                }
                plan.status = false;
                plan.startTime = null;
                testPlanDao.updatePlan(plan);
            });
        }
    });
}, 1000);

function schedule(startTime, now, action, trade) {
    var delay = startTime - now;
    var aDelay = action.delay;
    var aDelayUnit = action.delayUnit;
    if (aDelayUnit === 's') {
        delay = delay + aDelay * 1000;
    } else if (aDelayUnit === 'm') {
        delay = delay + aDelay * 60 * 1000;
    } else if (aDelayUnit === 'h') {
        delay = delay + aDelay * 3600 * 1000;
    } else {
        delay = delay + aDelay * 3600 * 24 * 1000;
    }
    var actionName = action.action + " " + action.tid;
    console.log("schedule action: " + actionName + " delay: " + delay + "ms.")
    setTimeout(function() {
        console.log("do action: " + actionName);
        tradeMock.mock(action.action, trade);
    }, delay);
}

function getTradeByTid(tid, trades) {
    var trade;
    trades.forEach(function(t) {
        if (t.tid === tid) {
            trade = t;
        }
    });
    return trade;
}

