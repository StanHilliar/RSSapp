'use strict';

angular.module('mean.eloquaservices').factory('eloquapi', function($resource) 
{
  return $resource('/api/accounts/auth/eloqua/callback?code=:code', { code: '@code' });
});