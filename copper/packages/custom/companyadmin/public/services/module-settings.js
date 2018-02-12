'use strict';
angular.module('mean.companyadmin').factory('CompanyModuleSettings', ['$http', '$q',
	function($http, $q) {
		return {
			get: function(name) {
				var deferred = $q.defer();
				$http.get('/api/cadmin/moduleSettings/' + name)
					.success(function(data) {
						deferred.resolve(data);
					})
					.error(function(data) {
						deferred.reject(data);
					});
				return deferred.promise;
			},
			update: function(name, data) {
				var deferred = $q.defer();
				$http.put('/api/cadmin/moduleSettings/' + name, data)
					.success(function(data) {
						deferred.resolve(data);
					})
					.error(function(data) {
						deferred.reject(data);
					});
				return deferred.promise;
			},
			save: function(name, data) {
				var deferred = $q.defer();
				$http.post('/api/cadmin/moduleSettings/' + name, data)
					.success(function(data) {
						deferred.resolve(data);
					})
					.error(function(data) {
						deferred.reject(data);
					});
				return deferred.promise;
			}
		};
	}
]);