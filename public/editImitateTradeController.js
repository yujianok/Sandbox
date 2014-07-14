/**
 * Created by darcy on 13-12-20.
 */

imitateApp.controller("editImitateTradeController",
    ["$scope", "$restClient", "$location", "$modalInstance", "selectedId"
    , function ($scope, $restClient, $location, $modalInstance, selectedId) {

        $scope.mytime = new Date();
        $scope.testAction = {};

        if (selectedId != -1) {
            $restClient.get({user: "sandbox", entity: "TestAction", id: selectedId}, function (data) {
                $scope.testAction = data;
            });
        }

        $scope.editTestAction = function () {
            if($scope.testAction.action == "" || $scope.testAction.action == undefined){
                $modalInstance.close();
                return;
            }
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

        $scope.close = function () {
            $modalInstance.close();
        };

    }]);




