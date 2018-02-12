'use strict';

angular.module('mean.eloquaservices').service('Eloquaservices', ['$resource',
    function($resource)
    {
       var myData = null;
       //var factory = {};

	/*    var promise = $http.get('http://www.google.de').success(function (data)
	    {
	    	myData = data;
	    }).error(function(){myData = [];});*/
/*
		var promisedTEST = function($q,  $timeout)
    	{
            // Initialize a new promise
            var deferred = $q.defer();

            $http.get('http://www.google.de').success(function (data)
		    {
		    	myData = data;
		    	$timeout(function () {
            deferred.resolve();
          }, 2000);
		    });


            return deferred.promise;
        };*/
/*
        var checkLoggedin = function($q, $timeout, $http, $location)
    	 {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user)
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
            });
            //$timeout(deferred.resolve);

            return deferred.promise;
        };*/

/*
		var promise = function($q,  $timeout)
    	{
            myData = {'asd':'123'};
        };*/

    function setData(data)
    {
        myData = data;
    }

    function doStuff()
    {
        return myData;//.getSomeData();
    }

    function getSearch()
    {
        return $resource('/api/contacts/search?search=:search&page=:page&count=:count&depth=:depth');
    }

    function getContact()
    {
        return $resource('/api/contact/:id?depth=:depth&viewId=:viewId');
    }

    function getContactViews()
    {
        return $resource('/api/contactviews/search?search=:search&page=:page&count=:count&depth=:depth');
    }


    function searchContactFields()
    {
        return $resource('/api/contact/field/search?search=:search&page=:page&count=:count&depth=:depth');
    }

    function add_new()
    {
        return $resource('/api/accounts/add_new');
    }

    function getAllAccounts()
    {
        return $resource('/api/accounts/getAllAccounts');
    }

    function addNewApiAccount()
    {
        return $resource('/api/accounts/auth/eloqua');
    }


    function getAllLandingpages()
    {
        return $resource('/api/:company/:username/landingpages/getAllLandingPages?search=:search&page=:page&count=:count&depth=:depth');
    }

    function getApiCallback()
    {
       return $resource('/api/accounts/auth/eloqua/callback?code=:code');
    }

    return {
        getSearch: getSearch,
        getContact: getContact,
        getContactViews: getContactViews,
        searchContactFields: searchContactFields,
        aa: setData,
        bb: doStuff,
        add_new: add_new,
        addNewApiAccount: addNewApiAccount,
        getAllAccounts: getAllAccounts,
        getApiCallback: getApiCallback,
        getAllLandingpages: getAllLandingpages
    };
	   // return factory;


	    //return $resource('/api/entries/:id');
       // return $resource('/ohmygoditsdata/:id');
	 //   return $resource('/contacts/search?search=:search&page=:page&count=:count&depth=:depth');
    }
]);
