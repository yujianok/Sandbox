/**
 * Created by darcy on 13-12-20.
 */

imitateApp.controller("editImitateTradeController",
    ["$scope", "$restClient", "$location", "$modalInstance", "selectedId"
    , function ($scope, $restClient, $location, $modalInstance, selectedId) {

    $scope.mytime = new Date();
    $scope.testAction = {};
    $scope.testAction.orders = [];

    if (selectedId != -1) {
        $restClient.get({user: "sandbox", entity: "TestAction", id: selectedId}, function (data) {
            $scope.testAction = data;
        });
    }

    $scope.save = function () {
        parseData($scope.testAction);
        if (selectedId != -1) {
            $restClient.update({user: "sandbox", entity: "TestAction", id: selectedId}, $scope.testAction, function () {
                $modalInstance.close();
            });
        } else {
            $restClient.save({user: "sandbox", entity: "TestAction"}, $scope.testAction, function () {
                $modalInstance.close();
            });
        }
    };

    function parseData(action) {
        if (action.create_time) {
            action.create_time = new Date(action.create_time);
        }
        if (action.pay_time) {
            action.pay_time = new Date(action.pay_time);
        }
        if (action.consign_time) {
            action.consign_time = new Date(action.consign_time);
        }
        if (action.end_time) {
            action.end_time = new Date(action.end_time);
        }
    }

    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.addOrder = function() {
        $scope.testAction.orders.push({});
    }

    $scope.removeOrder = function() {
        $scope.testAction.orders.pop({});
    }

}]);




