'use strict';

angular.module('mean.eloquaservices').config(['$stateProvider',
    function($stateProvider)
    {
      $stateProvider.state('eloqua_services accounts',
      {
          url: '/eloquaservices/accounts',
          templateUrl: 'eloquaservices/views/accounts.html'
      })
      .state('eloqua_services_accounts_addnew',
      {
          url: '/eloquaservices/accounts/add_new',
          templateUrl: 'eloquaservices/views/accounts/add_new.html'
      })
      .state('eloqua_services_accounts_addnewapi_callback',
      {
          url: '/eloquaservices/accounts/eloqua/callback?code',
          templateUrl: 'eloquaservices/views/callback.html',
          controller: 'EloquaApiAccountsController',
          resolve: 
          {
                callBackData: ['$stateParams','eloquapi', function($stateParams, eloquapi)
                {
                    eloquapi.query({ code: $stateParams.code}).$promise.then(function(data)
                    {
                      console.log('asdasdasfasfdas');
                      return data;
                    });
                }]
          }
      });
    }
]);
