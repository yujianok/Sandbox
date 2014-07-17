/**
 * Created by darcy on 13-12-20.
 */
sandboxApp.controller("editTestPlanController",
    ["$scope", "$restClient", "$location", "$modalInstance", "selectedId"
    , function ($scope, $restClient, $location, $modalInstance, selectedId) {

    $scope.testAction = {};
    $scope.testAction.orders = [];
    $scope.testAction.status = true;

    var oldStatus = false;

    if (selectedId != -1) {
        $restClient.get({user: "sandbox", entity: "TestAction", id: selectedId}, function (data) {
            $scope.testAction = data;
            oldStatus = $scope.testAction.status;
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
        if (typeof(action.status ) !== 'boolean') {
            action.status = action.status === 'true'
        }
        if (action.status !== oldStatus && action.status) {
            action.startTime = new Date();
        }
        if (action.status === false) {
            action.startTime = null;
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




