/**
 * Created by darcy on 14-7-9.
 */

var imitateApp = angular.module("imitateApp", ["ngResource","ui.bootstrap","ui.bootstrap.datetimepicker"]);

imitateApp.factory("$restClient", ["$resource", "$http", function ($resource, $http) {

    $http.defaults.cache = false;

    return $resource("rest/:user/:entity/:id", null, {
        "update": { method: "PUT" },
        "count": {method: "GET", params: {id: "count"}, transformResponse: function (data, header) {
            return $.isNumeric(data) ? {count: data} : data;
        } }
    });
}]);

angular.merge = function (dist, source) {
    for (var field in source) {
        if (source[field]) {
            dist[field] = source[field];
        }
    }
    return dist;
}

imitateApp.controller("imitateTradeController",["$scope","$restClient","$modal",function($scope,$restClient,$modal){
    query();

    $scope.query =  function (){
        query();
    }

    $scope.add = function () {
        openDialog(-1);
    }

    $scope.edit = function () {
        var isSelectedOne = valSelectedOne();
        if (isSelectedOne == "success") {
            openDialog($scope.selectedTestAction);
        } else {
            alert(isSelectedOne);
        }
    }

    $scope.delete = function () {
        var isSelectedOne = valSelectedOne();
        if (isSelectedOne == "success") {
            if (confirm("确认要删除吗？")) {
                $restClient.remove({user: "sandbox", entity: "TestAction", id: $scope.selectedTestAction}, function (data) {
                    query();
                });
            }
        } else {
            alert(isSelectedOne);
        }
    }

    function query(){
        $scope.selectedTestAction = "";
        $restClient.query(angular.merge({user: "sandbox", entity: "TestAction"}, $scope.queryTestAction), function (data) {
            $scope.testActions = data;
        });
    }

    function valSelectedOne() {
        if ($scope.selectedTestAction == ""
            || $scope.selectedTestAction == undefined) {
            return "请选择一个事件";
        } else {
            return "success";
        }
    }

    function openDialog(selectId) {
        var modalInstance = $modal.open({
            templateUrl: 'editImitateTrade.html',
            controller: 'editImitateTradeController',
            windowClass: "modal-width",
            backdrop: 'static',
            keyboard: false,
            resolve: {
                selectedId: function () {
                    return selectId;
                }
            }
        });

        modalInstance.result.then(function () {
            query();
        }, function (e) {
            alert('ERROR! Please contact the system administrator ' + e);
        });
    }
}]);