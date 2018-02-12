'use strict';

// The Package is past automatically as first parameter
module.exports = function(Eloquaservices, app, auth, database)
{
    var EloquaHelper = require('../controllers/eloqua/EloquaHelper').EloquaHelper;


    app.post('/api/apps/create?', function(req, res, next)
    {
      console.log('/apps/create?');
      console.log('install_id: '+req.query.installid);
      console.log('appid: '+req.query.appid);
      console.log('callbackurl: '+req.query.callbackurl);
      console.log('siteid: '+req.query.siteid);
      console.log('site_name: '+req.query.site);


      console.log(EloquaHelper.helloWorld());
   
      EloquaHelper.createEloquaApp(req.query.appid, req.query.site, req.query.siteid, req.query.installid, 
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

};
