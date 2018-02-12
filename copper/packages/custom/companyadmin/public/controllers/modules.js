'use strict';

angular.module('mean.companyadmin').controller('CompanyModulesController', ['$scope', 'Global', '$rootScope', 'Menus', 'CompanyModules',
    function($scope, Global, $rootScope, Menus, CompanyModules) {

	    var vm = this;

	    $scope.modules = [];

	    vm.init = function() {
		    Menus.query({
			    name: 'modules',
			    defaultMenu: []
		    }, function(menu) {
			    vm.modules = menu;
		    });
	    };
    }
]);