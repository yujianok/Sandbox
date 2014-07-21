/**
 * Created by darcy on 13-12-20.
 */
sandboxApp.controller("editTestPlanController",
    ["$scope", "$restClient", "$location", "$modalInstance", "selectedId"
    , function ($scope, $restClient, $location, $modalInstance, selectedId) {

    $scope.testPlan = {};
    $scope.testPlan.trades = [];
    $scope.testPlan.actions = [];
    $scope.testPlan.status = false;

    $scope.tids = [];

    $scope.users = users;

    $scope.userData = {};
    $scope.userData.nicks = [];

    users.forEach(function(user) {
        var data = {};
        var userItems = [];
        items.forEach(function(item) {
            if (item.userId === user.id) {
                userItems.push(item);
            }
        });
        data['items'] = userItems;
        var userCustomers = [];
        customers.forEach(function(customer) {
            if(customer.userId === user.id) {
                userCustomers.push(customer);
            }
        });
        data['customers'] = userCustomers;
        $scope.userData[user.nick] = data;
        $scope.userData.nicks.push(user.nick);

    });

    if (selectedId != -1) {
        $restClient.get({user: esIndex, entity: testPlanName, id: selectedId}, function (data) {
            $scope.testPlan = data;
            $scope.testPlan.actions.forEach(function(action) {
                $scope.tids.push(action.tid);
            });
        });
    }

    $scope.save = function () {
        parseData($scope.testPlan);
        if (selectedId != -1) {
            $restClient.update({user: esIndex, entity: testPlanName, id: selectedId}, $scope.testPlan, function () {
                $modalInstance.close();
            });
        } else {
            $restClient.save({user: esIndex, entity: testPlanName}, $scope.testPlan, function () {
                $modalInstance.close();
            });
        }
    };

    function parseData(plan) {
        plan.trades.forEach(function(trade) {
            var nick = trade.buyerNick;
            customers.forEach(function(customer) {
                if (customer.nick === nick) {
                    trade.customer = customer;
                }
            });
            trade.orders.forEach(function(order) {
                var numIId = order.numIId;
                numIId = parseInt(numIId);
                order.numIId = numIId;
                order.num = parseInt(order.num);
                items.forEach(function(item) {
                    if (item.id === numIId) {
                        order.price = item.price;
                        order.title = item.title;
                    }
                });
            });
        });
        plan.actions.forEach(function(action) {
            action.tid = parseInt(action.tid);
        });
    }

    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.addTrade = function() {
        var trade = {};
        trade.orders = [];
        trade.tid = new Date().getTime();
        $scope.testPlan.trades.push(trade);
        $scope.tids = [];
        $scope.testPlan.trades.forEach(function(trade) {
            $scope.tids.push(trade.tid);
        });

    }

    $scope.removeTrade = function() {
        $scope.testPlan.trades.pop();
    }

    $scope.addOrder = function(tid) {
        $scope.testPlan.trades.forEach(function(trade) {
            if (trade.tid === tid) {
                trade.orders.push({});
            }
        });
    }

    $scope.removeOrder = function(tid) {
        $scope.testPlan.trades.forEach(function(trade) {
            if (trade.tid === tid) {
                trade.orders.pop();
            }
        });
    }

    $scope.addAction = function() {
        $scope.testPlan.actions.push({});
    }

    $scope.removeAction = function() {
        $scope.testPlan.actions.pop();
    }

}]);




