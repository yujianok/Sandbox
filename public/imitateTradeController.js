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

    $scope.query =  function(){
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
            angular.forEach(data,function(testAction){
                setActionZh_ch(testAction);
            })
            $scope.testActions = data;
        });
    }

    function setActionZh_ch(testAction){
        var action = testAction.action;
        if(action == 'TRADE_CREATED'){
            testAction.action = '订单创建';
        }else if(action == 'TRADE_PAID'){
            testAction.action = '订单付款';
        }else if(action == 'TRADE_CONSIGNED'){
            testAction.action = '订单发货';
        }else if(action == 'TRADE_FINISHED'){
            testAction.action = '订单确认';
        }else if(action == 'TRADE_CLOSED'){
            testAction.action = '付款以后用户退款成功，交易自动关闭';
        }else if(action == 'TRADE_CLOSED_BY_TAOBAO'){
            testAction.action = '付款以前，卖家或买家主动关闭交易';
        }else if(action == 'REFUND_CREATED'){
            testAction.action = '买家申请退款';
        }else if(action == 'REFUND_AGREED'){
            testAction.action = '卖家同意退款';
        }else if(action == 'REFUND_CONSIGNED'){
            testAction.action = '买家已退货';
        }else if(action == 'REFUND_REFUSED'){
            testAction.action = '卖家拒绝退款';
        }else if(action == 'REFUND_CLOSED'){
            testAction.action = '退款关闭';
        }else if(action == 'REFUND_SUCCEED'){
            testAction.action = '退款成功';
        }else if(action == 'SHIPPING_ARRIVAL_LOCAL'){
            testAction.action = '快递到达本地';
        }else if(action == 'SHIPPING_CONFIRM'){
            testAction.action = '快递签收';
        }
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