'use strict';

// User routes use users controller



module.exports = {
    init: function(app, identifier)
{

 /*
    app.route('/apps/services/'+identifier+'/create?').get(function (req, res) 
    { 
         res.send('yolo');
    });
*/


    var EloquaHelper    = require('./EloquaHelper.js').EloquaHelper;
    var async           = require('async');
    var Eloqua          = require('../../lib/eloqua_request');


    
    app.route('/apps/services/'+identifier+'/create?').post(function (req, res) 
    { 
        console.log('/apps/services/'+identifier+'/create?');
        console.log('siteid: '+req.query.site_id);
        console.log('instance: '+req.query.instance);
        console.log('site_name: '+req.query.site_name);
        console.log('install_id: '+req.query.install_id);
     
        EloquaHelper.createEloquaApp(req.query.instance, req.query.site_name, req.query.site_id, req.query.install_id, 
            function(err, create_res)
            {
                console.log('createEloquaApp callback');
                if(res.success === true)
                {
                    res.status(200); 
                    res.send();
                }
                else
                {
                    console.log(err);
                    //TODO do something usefull
                    res.status(200); 
                    res.send();
                }
            });
    });    

    app.route('/apps/services/'+identifier+'/config?').get(function (req, res) 
    { 
          console.log('/apps/services/'+identifier+'/config?');
    });


    app.route('/apps/services/'+identifier+'/delete?').delete(function (req, res) 
    { 
        console.log('/apps/services/'+identifier+'/delete?');

        res.send('<br><br>'+req.message); 
    }); 


    app.route('/apps/services/'+identifier+'/notify?').post(function (req, res) 
    { 
        console.log('/apps/services/'+identifier+'/notify?');

        res.status(204); 
        res.send();
    });    

    app.route('/apps/services/'+identifier+'/push?').get(function (req, res) 
    { 
        console.log('/apps/services/'+identifier+'/push?');
        var instance_id = req.query.instance;

        async.waterfall(
        [
            function(callback)
            {
                console.log('getEloquaAppByInstance');
                EloquaHelper.getEloquaAppByInstance(instance_id, callback); 
            },
            function(eapp, callback)
            {
                console.log('getUserByApp');
                EloquaHelper.getUserByApp(eapp,callback);
            },
            function(eloquaUser, callback)
            {
                console.log('getAccessTokenByUser');
                EloquaHelper.getAccessTokenByUser(eloquaUser, callback);
            },
            function(access_token, callback)
            {
                console.log('import');
                var post_data = 
                {
                    'name': 'AwesomeApp Feeder Bulk Import',
                    'updateRule' : 'always',
                    'fields': 
                    {
                        'emailAddress': '{{Contact.Field(C_EmailAddress)}}'
                    },
                    'syncActions': 
                    {
                        'destination': '{{FeederInstance('+EloquaHelper.prepareInstanceId(instance_id)+')}}',
                        'action': 'setStatus',
                        'status': 'complete'
                    },
                    'identifierFieldName': 'emailAddress'
                };

                var eloqua = new Eloqua('Bearer '+access_token);
                eloqua.post('/API/Bulk/2.0/contacts/imports', post_data, function(err, response)
                {   
                    callback(err, eloqua, response);
                });
            },
            function(eloqua, response, callback)
            {
                console.log('excecute import');
                var import_url = response.uri;
                if(import_url !== '')
                {
                    var sync_data = [];

                    sync_data.push({'emailAddress': 'mail@relatedpixels.com'});
                  
                    console.log('post('+'/api/bulk/2.0'+import_url+'/data)');
                    eloqua.post('/api/bulk/2.0'+import_url+'/data', sync_data, function(sync_err, sync_response)
                    {   
                        if(sync_err)
                        {
                            console.dir(sync_err);
                            console.log('eq err:'+sync_err);
                        }
                        if(sync_err.code === 204)
                        {
                            callback(null, eloqua, import_url, sync_response);             
                        }
                        else
                        {

                            callback(sync_err, eloqua, import_url, sync_response);             
                        }
                    });
                }
            },         
            function(eloqua, sync_url, response, callback)
            {
                console.log('sync '+sync_url);

                var sync_data = 
                    {
                        'syncedInstanceUri' : sync_url
                    };

                eloqua.post('/API/Bulk/2.0/syncs', sync_data, function(sync_err, sync_response)
                {   
                    if(sync_err)
                    {
                        console.dir(sync_err);
                        console.log('eq err:'+sync_err);
                    }
                    callback(sync_err, eloqua, sync_response);
                         
                });
                
            },
            function(eloqua, response, callback)
            {
                console.log('check');
                eloqua.get('/API/Bulk/2.0/'+response.uri, function(check_sync_err, check_sync_response)
                {   
                    if(check_sync_err)
                    {
                        console.dir(check_sync_err);
                        //console.dir(sync_err.msg.failures);
                        console.log('eq err:'+check_sync_err);
                    }
                    console.log('eq response: %j', check_sync_response);
                
                    callback(check_sync_err, check_sync_response);    
                });
            }


        ], 
        function (err, check_sync_response) 
        {
            console.log('end of the waterfall');
            console.log('errors: %j', err);
            console.log('response: %j', check_sync_response);

        });
        EloquaHelper.getEloquaAppByInstance(instance_id, function(err, eapp)
        {
            //EloquaHelper.getUserByApp(eapp, 
        });

        console.log('instance_id: '+instance_id+ ' ');
        console.log('asset_id: '+req.query.asset+ ' ');

        res.status(204); 
        res.send();
    });
 

},
 abcdefg : function()
 {

 }
};
