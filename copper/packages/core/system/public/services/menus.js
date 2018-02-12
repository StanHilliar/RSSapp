'use strict';

angular.module('mean.system').factory('Menus', ['$resource',
  function($resource) {
    return $resource('api/:company/admin/menu/:name', {
      name: '@name',
      company: '@company',
      defaultMenu: '@defaultMenu'
    });
  }
]);
