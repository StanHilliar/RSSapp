'use strict';

angular.module('mean.eloquaservices').config(['$stateProvider',
    function($stateProvider) {

    	 var checkLoggedin = function($q, $timeout, $http, $location)
    	 {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            /*$http.get('/loggedin').success(function(user)
            {
                // Authenticated
                if (user !== '0') $timeout(deferred.resolve);

                // Not Authenticated
                else
                {
                    //$timeout(deferred.reject);
                    $timeout(deferred.resolve);
                    //$location.url('/login');
                }
            });*/
            $timeout(deferred.resolve);

            return deferred.promise;
        };

    	$stateProvider.state('eloquaservices example page', {
      		url: '/eloquaservices/example',
      		templateUrl: 'eloquaservices/views/index.html'
    	})
    	.state('eloqua_services wtf page',
    	{
      		url: '/eloquaservices/wtf',
      		templateUrl: 'eloquaservices/views/wtf.html'
    	})
      .state('eloqua_services search page',
      {
          url: '/eloquaservices/search',
          templateUrl: 'eloquaservices/views/search.html'
      })
      .state('eloqua_services contact details',
      {
          url: '/eloquaservices/contact/:id',
          templateUrl: 'eloquaservices/views/contact.html'
      })
    	.state('eloqua_services wtf22 page',
    	{
      		url: '/eloquaservices/wtf2',
      		templateUrl: 'eloquaservices/views/wtf.html',
      		resolve:
      		{
            	loggedin: checkLoggedin
            }
    	})
    	.state('eloqua_services create article',
    	{
            url: '/eloquaservices/create',
            templateUrl: 'eloquaservices/views/wtf.html',
            resolve:
            {
	        	EloquaServices: function ($q, $timeout)
	        	{
	          		var defer = $q.defer;
	          		$timeout(function ()
	          		{
	            		defer.resolve();
	          		}, 2000);
	          		return defer.promise;
	        	}
      		}
        })
		.state('eloqua_services omg page',
    	{
      		url: '/eloquaservices/omg',
      		controller: 'EloquaservicesController',
      		templateUrl: 'eloquaservices/views/wtf.html',
      		resolve:
      		{
        		message: function(EloquaServices)
        		{
        			return EloquaServices.promise;
      			}
      		}
    	});
    }
]);
