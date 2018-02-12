'use strict';

angular.module('mean.eloquaservices').config(['$stateProvider',
    function($stateProvider)
    {

      $stateProvider.state('eloqua_services_landingpages',
      {
          url: '/eloquaservices/:company/:username/landingpages',
          templateUrl: 'eloquaservices/views/landingpages/index.html'
      });
    }
]);
