'use strict';

/* jshint -W098 */
angular.module('mean.eloquaservices').controller('EloquaservicesController', ['$scope', '$state', '$rootScope', 'Global', 'Eloquaservices',
  function($scope,$state, $rootScope, Global, Eloquaservices) 
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

//    var myfactory = new Eloquaservices();
    $scope.status = {
      isopen: false
    };

    $scope.toggled = function(open) 
    {
      console.log('Dropdown is now: ', open);
    };

    $scope.singleClickAction = function(id) 
    {
      console.log('s0ingleclick');
      console.dir(id);
      console.log($scope.myelements.elements[id].emailAddress);
      //console.dir(event);
      $state.go('eloqua_services contact details', { id: $scope.myelements.elements[id].id });
   
    };  

    $scope.doubleClick = function() 
    {
      console.log('doubleclick');
    };

    $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };

    $scope.itemsPerPage = 30;
    $scope.currentPage = 0;

    
   // console.log(Eloquaservices.doStuff);
   //console.dir(Eloquaservices); 

    $scope.startSearch = function() 
    {
      $scope.currentPage = 1;
      $scope.myelements = Eloquaservices.getSearch().get({ search: $scope.searchText, page: $scope.currentPage, count: $scope.itemsPerPage, depth:'minimal'}, function() 
      {
          console.log($scope.myelements);
          $scope.totalItems = $scope.myelements.total;
          $scope.currentPage = $scope.myelements.page;
      }); 
    };

    $scope.myelements = Eloquaservices.getSearch().get({ search: $scope.searchText, page: '1', count: $scope.itemsPerPage, depth:'minimal'}, function() 
    {
        console.log($scope.myelements);
        $scope.totalItems = $scope.myelements.total;
        $scope.currentPage = $scope.myelements.page;

        $scope.dynamic = 100;

    }); // get() returns a single entry

    $scope.setPage = function (pageNo) 
    {
      $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() 
    {
      $scope.myelements = Eloquaservices.getSearch().get({ search: $scope.searchText, page: $scope.currentPage, count: $scope.itemsPerPage, depth:'minimal'}, function() 
      {
          console.log($scope.myelements);
          $scope.totalItems = $scope.myelements.total;
          $scope.currentPage = $scope.myelements.page;
      }); 
      //$log.log('Page changed to: ' + $scope.currentPage);
    };
    /*var entries = EloquaServices.query(function() 
    {
        console.log(entries);
        $scope.elements = entries;
    }); //query() returns all the entries
*/

    //  console.dir(message);
      //console.log('Promise is now resolved: '+EloquaServices.doStuff().data);
   //   $scope.data = EloquaServices.doStuff();
      /*console.dir(EloquaServices.doStuff());
      console.log('.xxxxx');
      console.log(EloquaServices.doStuff());
      EloquaServices.setData( {'asd':'123'});
      console.log(EloquaServices.doStuff());*/


      $scope.$on('$stateNotFound', 
    function(event, unfoundState, fromState, fromParams)
    { 
      console.log(unfoundState.to); // "lazy.state"
      console.log(unfoundState.toParams); // {a:1, b:2}
      console.log(unfoundState.options); // {inherit:false} + default options
    });

    $rootScope.$on('$stateNotFound', 
      function(event, unfoundState, fromState, fromParams)
      { 
        console.log(unfoundState.to); // "lazy.state"
        console.log(unfoundState.toParams); // {a:1, b:2}
        console.log(unfoundState.options); // {inherit:false} + default options
      });
    }
]);
