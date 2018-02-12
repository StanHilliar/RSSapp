'use strict';

/* jshint -W098 */
angular.module('mean.eloquaservices').controller('EloquaAccountsController', ['$scope', '$location', '$state', '$rootScope', 'Global', 'Eloquaservices',
  function($scope,$location, $state, $rootScope, Global, Eloquaservices)
  {
    console.log('eloquaservices startup');
    $scope.global = Global;
    $scope.package = {
        name: 'eloquaservices'
    };

    $scope.model =
    {
      message: 'Im a great app!'
    };

    $scope.posts = [
    'post 1',
    'post 2',
    'post 3',
    'post 4',
    'post 5'
    ];

    $scope.login_send = false;
    $scope.login_success = false;
    $scope.login_error_msg = '';
    $scope.myAccounts = '';
    $scope.add_new_submit = function()
    {
        console.log($scope.add_new_company);
        console.log($scope.add_new_username);
        console.log($scope.add_new_password);

        $scope.myelements = Eloquaservices.add_new().save({ company: $scope.add_new_company, username: $scope.add_new_username, password: $scope.add_new_password}, function(response)
        {

            console.log(response);
            console.log(response.success);
          

            $scope.login_send = true;
            $scope.login_success = response.success;
            $scope.login_error_msg = response.error;

            //console.log($scope.myelements);
          //  $scope.totalItems = $scope.myelements.total;
          //  $scope.currentPage = $scope.myelements.page;
        });
    };

    $scope.loadAccounts = function()
    {
      Eloquaservices.getAllAccounts().get(function(response)
      {
          console.log('loadAccounts:');
          console.log(response);
          console.log(response.success);
          console.log('-----------------');


          $scope.myAccounts = response;

      });  


    };

    $scope.addNewApiAccount = function()
    {
      /*
      Eloquaservices.addNewApiAccount().get(function(response)
      {
          console.log('response:');
          console.log(response);
          console.log(response.success);
          console.log('-----------------');
      });*/
      $location.path('/api/accounts/auth/eloqua');

    };

    $scope.gotoAddNew = function()
    {
      $location.path('/eloquaservices/accounts/add_new');
    };

  }
]);
