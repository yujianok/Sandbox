var testPlanDao = require('../dao/test_plan_dao');
var tradeMock = require('../data_mock/trade_mock');

exports.initTestPlan = function() {
    var query = {from: 0, size: 100000, conditions: [{name: 'status', value: true, comparator: 'eq'}]};
    testPlanDao.getAllPlans(query, function(error, rsp) {
        rsp.forEach(function(plan) {
            if (!error) {
                plan.status = false;
                plan.startTime = null;
                testPlanDao.updatePlan(plan);
            }
        });
    });
}

exports.schedulePlan = function(plan) {
    if (plan.status) {
        var index = 0;
        doNext(plan.actions, plan.trades, index, plan);
    }
}

function doNext(actions, trades, index, plan) {
    if (index === actions.length) {
        console.log("all actions done. close the plan.")
        plan.status = false;
        plan.startTime = null;
        testPlanDao.updatePlan(plan);
    } else {
        var action = actions[index];
        var delayMills = delayToMills(action.delay, action.delayUnit);
        var trade = getTradeByTid(action.tid, trades);
        var actionName = action.action + " " + action.tid;
        console.log("schedule action: " + actionName + " delay: " + delayMills + "ms.")
        setTimeout(function() {
            console.log("do action: " + actionName);
            tradeMock.mock(action.action, trade);
            index++;
            doNext(actions, trades, index, plan);
        }, delayMills);
    }
}

function delayToMills(delay, delayUnit) {
    var result;
    if (delayUnit === 's') {
        result = delay * 1000;
    } else if (delayUnit === 'm') {
        result = delay * 60 * 1000;
    } else if (delayUnit === 'h') {
        result = delay * 3600 * 1000;
    } else {
        result = delay * 3600 * 24 * 1000;
    }
    return result;
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

