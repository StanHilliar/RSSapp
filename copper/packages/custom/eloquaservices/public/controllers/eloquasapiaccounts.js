'use strict';

/* jshint -W098 */
angular.module('mean.eloquaservices').factory('EloquaApiAccountsController', ['$scope', '$location', '$state', '$rootScope', 'Global', 'callBackData','http',
  function($scope, $location, $state, $rootScope, Global, callBackData, $http)
  {
  	$scope.response = callBackData();
  }
]);
