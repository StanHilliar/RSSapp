//Users service used for users REST endpoint
angular.module('mean.admin').factory("Companies", ['$resource',
    function($resource) 
    {
        return $resource('/api/admin/companies/:companyId', 
        {
            companyId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
