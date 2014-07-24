/**
 * Created by darcy on 14-7-9.
 */
sandboxApp.controller("testPlanListController",
    ["$scope","$restClient","$modal",function($scope,$restClient,$modal){

    query();

    $scope.query = function (){
        query();
    }

    $scope.add = function () {
        openDialog(-1);
    }

    $scope.users = users;

    $scope.edit = function () {
        var isSelectedOne = valSelectedOne();
        var status;
        $scope.testActions.forEach(function(action) {
            if (action.id === parseInt($scope.selectedTestAction)) {
                status = action.status;
            }
        });
        if (status) {
            alert('无法修改运行中测试');
            return;
        }
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
                $restClient.remove({user: esIndex, entity: testPlanName, id: $scope.selectedTestAction}, function (data) {
                    query();
                });
            }
        } else {
            alert(isSelectedOne);
        }
    }

    $scope.start = function(actionId) {
        $scope.testActions.forEach(function(action) {
            if(actionId === action.id) {
                if(!action.status) {
                    action.startTime = new Date().getTime();
                    action.status = !action.status;
                }
                $restClient.update({user: esIndex, entity: testPlanName, id: action.id}, action);
            }
        });
    }

    $scope.deleteSendData = function(userId) {
        if  (userId) {
            $restClient.remove({user: esIndex, entity: 'SendData', id: userId}, function (error) {
                if (error) {
                    alert('删除失败');
                } else {
                    alert('删除成功');
                }
            });
        } else {
            alert("请选择用户");
        }
    }

    function query(){
        $scope.selectedTestAction = "";
        $restClient.query(angular.merge({user: esIndex, entity: testPlanName}, $scope.queryTestAction), function (data) {
            $scope.testActions = data;
        });
    }

    function valSelectedOne() {
        if ($scope.selectedTestAction == ""
            || $scope.selectedTestAction == undefined) {
            return "请选择一个计划";
        } else {
            return "success";
        }
    }

    function openDialog(selectId) {
        var modalInstance = $modal.open({
            templateUrl: 'editTestPlan.html',
            controller: 'editTestPlanController',
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