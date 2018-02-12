'use strict';
angular.module('mean.companyadmin').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('companyusers', {
                url: '/cadmin/users',
                templateUrl: 'companyadmin/views/users.html',
                resolve: {
                  isAdmin: function(MeanUser) {
                      return MeanUser.checkCompanyAdmin(MeanUser.company.id);
                  }
                }
            })
            .state('companycompanies', {
                url: '/cadmin/companies',
                templateUrl: 'companyadmin/views/companies.html',
                resolve: {
                  isAdmin: function(MeanUser) {
                      return MeanUser.checkCompanyAdmin(MeanUser.company.id);
                  }
                }
            }).state('companythemes', {
                url: '/cadmin/themes',
                templateUrl: 'companyadmin/views/themes.html',
                resolve: {
                  isAdmin: function(MeanUser) {
                      return MeanUser.checkCompanyAdmin(MeanUser.company.id);
                  }
                }
            }).state('companysettings', {
                url: '/cadmin/settings',
                templateUrl: 'companyadmin/views/settings.html',
                resolve: {
                  isAdmin: function(MeanUser) {
                      return MeanUser.checkCompanyAdmin(MeanUser.company.id);
                  }
                }
            }).state('companymodules', {
                url: '/cadmin/modules',
                templateUrl: 'companyadmin/views/modules.html',
                resolve: {
                  isAdmin: function(MeanUser) {
                      return MeanUser.checkCompanyAdmin(MeanUser.company.id);
                  }
                }
            }).state('companyadmin settings', {
		        url: '/cadmin/_settings',
		        templateUrl: 'companyadmin/views/example.html',
            resolve: {
              isAdmin: function(MeanUser) {
                  return MeanUser.checkCompanyAdmin(MeanUser.company.id);
              }
            }
	        });
    }
]).config(['ngClipProvider',
    function(ngClipProvider) {
        ngClipProvider.setPath('../companyadmin/assets/lib/zeroclipboard/dist/ZeroClipboard.swf');
    }
]);