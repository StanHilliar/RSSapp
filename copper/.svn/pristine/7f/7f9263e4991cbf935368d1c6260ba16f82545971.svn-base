//Users service used for users REST endpoint
angular.module('mean.companyadmin').factory("CompanyUsers", ['$resource',
    function($resource) 
    {
        return $resource('/api/:company/cadmin/users/:userId', 
        {
            userId: '@_id',
            company: '@company',
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
