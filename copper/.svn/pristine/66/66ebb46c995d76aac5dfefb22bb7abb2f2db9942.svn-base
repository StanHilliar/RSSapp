'use strict';

// The Package is past automatically as first parameter
module.exports = function(Eloquaservices, app, auth, database)
{
    var landingpages = require('../controllers/landingpages');


    app.get('/api/:company/:username/landingpages/getAllLandingPages?', function(req, res, next)
    //app.get('/landingpages/getAllLandingPages?', auth.requiresLogin, function(req, res, next)
    {
      landingpages.getAllLandingPages(req, res, next, function(error, response)
      {
        console.log(error);
        console.log(response);


        /*if(error)
        {
          res.status(200).json({
           success: false,
           error: error
          });
        }
        else
        {
          res.send(response);
        }*/
        res.send('asd');
      });
    });

};
