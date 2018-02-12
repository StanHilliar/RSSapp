'use strict';

// User routes use users controller



module.exports = {
    init: function(app, identifier)
{

    var EloquaHelper    = require('./EloquaHelper.js').EloquaHelper;
  //  var async           = require('async');
  //  var Eloqua          = require('../../lib/eloqua_request');


    
    app.route('/apps/services/'+identifier+'/create?').post(function (req, res) 
    { 
        console.log('/apps/services/'+identifier+'/create?');
        console.log('siteid: '+req.query.site_id);
        console.log('instance: '+req.query.instance);
        console.log('site_name: '+req.query.site_name);
        console.log('install_id: '+req.query.install_id);
     
        var myeloqua = EloquaHelper.getBasicLogin();

         myeloqua.get('/API/Bulk/2.0/'+' /data/contacts?depth=minimal&search=*leadteq.com&page=1&count=10', function(check_sync_err, check_sync_response)
        {   

        });
        res.status(200); 
        res.send();
    });      

    app.route('/contacts/search?').get(function (req, res) 
    { 
        console.log('/contacts/search?');

        console.log('search: '+req.query.search);
        console.log('page: '+req.query.page);
        console.log('count: '+req.query.count);
        console.log('depth: '+req.query.depth);
     
        var _search = req.query.search;
        var _page = req.query.page;
        var _count = req.query.count;
        var _depth = req.query.depth;
        
   
        if(_page === '')
        {
            _page = '1';
        }


        if(_count === '')
        {
            _count = '10';
        }

        if(_depth === '')
        {
            _depth = 'minimal';
        }

        

        //var myeloqua = EloquaHelper.getBasicLogin();
        //console.dir(myeloqua);
        
        /*myeloqua.get('/API/REST/2.0/settings/dashboard/home?depth=complete&extensions=e10', function(err, response)
        {
            console.log(err);
            console.log(response);

            res.send(response);
        });*/
        var myeloqua = EloquaHelper.getBasicLogin();
        EloquaHelper.contacts_search(myeloqua, _search, _page, _count, _depth, 
            function(err, response)
            {
                res.send(response);
            });

        /*
        myeloqua.get('/API/REST/2.0/data/contact/10981?depth=complete&extensions=e10', function(err, response)
        //myeloqua.get('/API/REST/1.0/data/contacts?depth=minimal&search=*leadteq.com', function(check_sync_err, check_sync_response)
        {   
            console.log(err);
            console.log(response);
            if(err && err.code)
            {
                res.send(err.msg);
            }
            else
            {
                res.send(response);
            }
        });*/

    });  

    app.route('/contact/:id?').get(function (req, res) 
    { 
        console.log('/contact/id');

        console.log('id: '+req.param('id'));
        console.log('viewId: '+req.query.viewId);
        console.log('depth: '+req.query.depth);
     
        var _id = req.param('id');
        var _viewId = req.query.viewId;
        var _depth = req.query.depth;
        
        if(_depth === '')
        {
            _depth = 'minimal';
        }


        var myeloqua = EloquaHelper.getBasicLogin();
        EloquaHelper.getContactById(myeloqua, _id, _depth, _viewId, 
            function(err, response)
            {
                //console.dir(response);
                res.send(response);
            });
    });  




    app.route('/contact/field/search/?').get(function (req, res) 
    { 
        console.log('/contact/field/search? !!!!!!!!');

        console.log('search: '+req.query.search);
        console.log('page: '+req.query.page);
        console.log('count: '+req.query.count);
        console.log('depth: '+req.query.depth);
     
        var _search = req.query.search;
        var _page = req.query.page;
        var _count = req.query.count;
        var _depth = req.query.depth;
        
   
        if(_page === '')
        {
            _page = '1';
        }


        if(_count === '')
        {
            _count = '10';
        }

        if(_depth === '')
        {
            _depth = 'minimal';
        }

        

        var myeloqua = EloquaHelper.getBasicLogin();
        EloquaHelper.searchContactField(myeloqua, _search, _page, _count, _depth, 
            function(err, response)
            {
                res.send(response);
            });
    });  

    app.route('/contact/field/:id?').get(function (req, res) 
    { 
        console.log('/contact/field/id  -----');

        console.log('id: '+req.param('id'));
        console.log('depth: '+req.query.depth);
     
        var _id = req.param('id');
        var _depth = req.query.depth;
        
        if(_depth === '')
        {
            _depth = 'minimal';
        }


        var myeloqua = EloquaHelper.getBasicLogin();
        EloquaHelper.getContactFieldById(myeloqua, _id, _depth, 
        function(err, response)
        {
            console.dir(response);
            res.send(response);
        });
    });

    app.route('/contactviews/search?').get(function (req, res) 
    { 
        console.log('/contactviews/search?');

        console.log('search: '+req.query.search);
        console.log('page: '+req.query.page);
        console.log('count: '+req.query.count);
        console.log('depth: '+req.query.depth);
     
        var _search = req.query.search;
        var _page = req.query.page;
        var _count = req.query.count;
        var _depth = req.query.depth;
        
   
        if(_page === '')
        {
            _page = '1';
        }


        if(_count === '')
        {
            _count = '10';
        }

        if(_depth === '')
        {
            _depth = 'minimal';
        }

        

        var myeloqua = EloquaHelper.getBasicLogin();
        EloquaHelper.searchContactViews(myeloqua, _search, _page, _count, _depth, 
            function(err, response)
            {
                res.send(response);
            });
    });  

    app.route('/contact/view/:id?').get(function (req, res) 
    { 
        console.log('/contact/view/id');

        console.log('id: '+req.param('id'));
        console.log('depth: '+req.query.depth);
     
        var _id = req.param('id');
        var _depth = req.query.depth;
        
        if(_depth === '')
        {
            _depth = 'minimal';
        }


        var myeloqua = EloquaHelper.getBasicLogin();
        EloquaHelper.getContactViewById(myeloqua, _id, _depth, 
        function(err, response)
        {
            console.dir(response);
            res.send(response);
        });
    });


    app.route('/search/'+identifier+'/config?').get(function (req, res) 
    { 
        console.log('/apps/services/'+identifier+'/config?');
        res.status(200); 
        res.send();
    });



  
 

},
 abcdefg : function()
 {

 }
};
