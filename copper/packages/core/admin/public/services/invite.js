//Users service used for users REST endpoint
angular.module('mean.admin').factory("Invites", ['$resource',
    function($resource) 
    {
        return $resource('/api/admin/invites/:inviteId', 
        {
            inviteId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
