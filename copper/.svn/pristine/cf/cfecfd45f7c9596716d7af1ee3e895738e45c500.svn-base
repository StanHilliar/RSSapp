'use strict';

/* jshint -W098 */
angular.module('mean.eloquaservices').controller('EloquaLandingpagesController', ['$scope', '$stateParams', '$location', '$state', '$rootScope', 'Global', 'Eloquaservices',
  function($scope, $stateParams, $location, $state, $rootScope, Global, Eloquaservices)
  {
    console.log('EloquaLandingpagesController startup');
    $scope.global = Global;
    $scope.package = 
    {
        name: 'eloquaservices'
    };

    $scope.company = $stateParams.company;

    $scope.loadLandingPages = function()
    {
      $scope.searchText = '*';
      $scope.currentPage = 1;
      $scope.itemsPerPage = 100;
      $scope.myelements = Eloquaservices.getAllLandingpages().get({ company: $stateParams.company , username: $stateParams.username, search: $scope.searchText, page: $scope.currentPage, count: $scope.itemsPerPage, depth:'minimal'}, function()
      {
          console.log($scope.elements);
          $scope.totalItems = $scope.myelements.total;
          $scope.currentPage = $scope.myelements.page;
      });
    };



  }
]);
