'use strict';
angular.module('mean.companyadmin').factory('CompanyModules', ['$http',
    function($http) {
        return {
            get: function(callback) {
                $http.get('/api/cadmin/modules')
                    .success(function(data) {
                        callback(data);
                    });
            }
        };
    }
]);