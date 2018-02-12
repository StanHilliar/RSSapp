'use strict';

/* jshint -W098 */
angular.module('mean.eloquaservices').controller('ContactController', ['$scope', '$stateParams', '$state', '$rootScope', 'Global', 'Eloquaservices',
  function($scope, $stateParams, $state, $rootScope, Global, Eloquaservices)
  {
    $scope.global = Global;
    $scope.package =
    {
        name: 'contact'
    };

    $scope.id = $stateParams.id;
    $scope.numPages = 10;

    $scope.contactviews = Eloquaservices.getContactViews().get({ search: '', depth:'complete', page: '1', count:'100'}, function()
    {
        console.log($scope.contactviews);
        $scope.selectedView = $scope.contactviews.elements[0];
       _updateFields($scope.contactviews.elements[0].id);
    });
/*
    $scope.fields = Eloquaservices.searchContactFields().get({ search: '', depth:'complete', page: '1', count:'100'}, function()
    {
      console.log($scope.fields);
    });*/

    $scope.viewupdate = function ()
    {
      console.log($scope.selectedView.name);
      _updateFields($scope.selectedView.id);
    };


    function _updateFields(id)
    {
      $scope.contactfields = Eloquaservices.getContact().get({ id: $stateParams.id, depth:'complete', viewId: id}, function()
      {
        console.log($scope.contactfields);
        $scope.totalItems = $scope.contactfields.total;
        $scope.currentPage = $scope.contactfields.page;
      });
    }



  }
]);
