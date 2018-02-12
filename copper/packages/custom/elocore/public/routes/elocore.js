'use strict';

angular.module('mean.elocore').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('elocore example page', {
      url: '/elocore/example',
      templateUrl: 'elocore/views/index.html'
    });
  }
]);
