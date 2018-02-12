'use strict';

angular.module('mean.companyadmin').factory('CompanySettings', ['$http',
    function($http) {
        var get = function(callback) {
        // Temporary - probably it should to be resource based.
            $http.get('/api/cadmin/settings').success(function(data, status, headers, config) {
                callback({
                    success: true,
                    settings: data
                });
            }).
            error(function(data, status, headers, config) {
                callback({
                    success: false
                });
            });
        };
        var update = function(settings, callback) {
            $http.put('/api/cadmin/settings', settings).success(function(data, status, headers, config) {
                callback(data);
            }).
            error(function(data, status, headers, config) {
                callback(data);
            });
        };
        return {
            get: get,
            update: update
        };
    }
]);
