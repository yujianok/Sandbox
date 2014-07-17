/**
 * Created by darcy on 13-12-20.
 */
sandboxApp.controller("editTestPlanController",
    ["$scope", "$restClient", "$location", "$modalInstance", "selectedId"
    , function ($scope, $restClient, $location, $modalInstance, selectedId) {

    $scope.testPlan = {};
    $scope.testPlan.trades = [];
    $scope.testPlan.status = true;

    var oldStatus = false;

    if (selectedId != -1) {
        $restClient.get({user: esIndex, entity: testPlanName, id: selectedId}, function (data) {
            $scope.testPlan = data;
            oldStatus = $scope.testPlan.status;
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
        if (typeof(plan.status ) !== 'boolean') {
            plan.status = plan.status === 'true'
        }
        if (plan.status !== oldStatus && plan.status) {
            plan.startTime = new Date().getTime();
        }
        if (plan.status === false) {
            plan.startTime = null;
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




