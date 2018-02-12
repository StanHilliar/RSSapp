//Users service used for users REST endpoint
angular.module('mean.companyadmin').factory("CompanyInvites", ['$resource',
    function($resource) 
    {
        return $resource('/api/cadmin/invites/:inviteId', 
        {
            inviteId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
