var sandboxApp = angular.module("sandboxApp", ["ngResource","ui.bootstrap","ui.bootstrap.datetimepicker"]);

sandboxApp.factory("$restClient", ["$resource", "$http", function ($resource, $http) {

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

var esIndex = 'sandbox';