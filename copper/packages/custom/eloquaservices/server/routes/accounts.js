'use strict';

var mongoose = require('mongoose'),
  OAuth2Strategy = require('passport-oauth2'),
  eloquaUser = mongoose.model('eloquaUser'),
  config = require('meanio').loadConfig();
var amazing = require('amazing')();
var https = require('https');
var async = require('async');

// The Package is past automatically as first parameter
module.exports = function(Eloquaservices, app, auth, database, passport)
{
    var accounts = require('../controllers/accounts');


    app.post('/api/accounts/add_new?', auth.requiresLogin, function(req, res, next)
    {
      accounts.add_new(req, res, next, function(error, response)
      {
        console.log(error);
        console.log(response);
        if(error)
        {
          res.status(200).json({
           success: false,
           error: error
          });
        }
        else
        {
          res.send(response);
        }
      });
    });

    app.get('/api/accounts/getAllAccounts?', auth.requiresLogin, function(req, res, next)
    {
      async.parallel([
      function(callback)
      {
        accounts.getAccounts(req, res, next, function(error, response)
        {
          console.log(error);
          console.log(response);
          if(error)
          {
            return callback(
            {
             success: false,
             error: error
            }, null);
          }
          else
          {
            return callback(null, response);
          }
        }); 
      },
      function(callback)
      {
        accounts.getApiAccounts(req, res, next, function(error, response)
        {
          console.log(error);
          console.log(response);
          if(error)
          {
            return callback(
            {
             success: false,
             error: error
            }, null);
          }
          else
          {
            return callback(null, response);
          }
        });
      }],
      // optional callback
      function(error, results)
      {
        var merged = [];
        console.log("!!!!!!!!!!!!!!!!!");
        console.log(results);
        console.log(results[0].users);
        console.log(results[1].users);
        merged = results[0].users.concat(results[1].users);
        if(error)
        {
          res.status(200).json(
          {
           success: false,
           error: error
          });
        }
        else
        {
          res.send( 
          {
           success: true,
           users : merged
          });
        }
      });
    }); 



    app.get('/api/accounts/test', function(req, res, next) 
    {
        console.log('test');
        console.log(req.user);

        res.send('asd');
    });

    app.get('/api/accounts/auth/eloqua', function(req, res, next) 
    {
        console.log('successful auth with eloqua');
        console.log(req.user);
        passport.authenticate('eloqua',{ session: false }, function(err, user, info) 
        {
          console.log('custom success11');
          console.log(user);
          if (err) 
          { 
            return next(err); 
          }
          if (!user) 
          { 
            return res.redirect('/login'); 
          }
          
          req.logIn(user, function(err) 
          {
            if (err) 
            { 
              return next(err); 
            }
            
            return res.redirect('/users/' + user.username);
          });
        })(req, res, next);
        }
    );

    app.get('/api/accounts/auth/eloqua/callback',  function(req, res, next) 
    {
        console.log('successful auth with eloqua');
        console.log(req.user);
        //passport.authenticate('eloqua',{ session: false });

        passport.authenticate('eloqua',{ session: false }, function(err, user, info) 
        {
          console.log('custom success22');
          console.log(user);
          if (err) 
          { 
            console.log("-->>>--->>err");
            console.error(err);
            //return next(err); 
            return res.send({success:false}); 
          }

          if (!user) 
          { 
            console.log("-->>>--->>not user");
            return res.send({success:false}); 

          }

          
          console.log("-->>>--->>"+req.user._id);
        

          return res.send({success:true}); 
        })(req, res, next);
    });
/*
    var isStrategySetup = false;
    function passport_setup_strategy()
    {
      return function(req, res, next)
      {
        if(!isStrategySetup)
        {
          passport.use(new OAuth2Strategy(
          {
            authorizationURL: config.eloqua.authorizationURL,
            tokenURL: config.eloqua.tokenURL,
            clientID: config.eloqua.clientID,
            clientSecret: config.eloqua.clientSecret,
            callbackURL: config.eloqua.callbackURL,
            customHeaders : 
            {
                'Authorization' : 'Basic '+ (new Buffer(config.eloqua.clientID+ ':'+config.eloqua.clientSecret)).toString('base64')
            }
          },
          function(accessToken, refreshToken, profile, done)
          {
            process.nextTick(function () 
            { 
            console.log('accessToken'+accessToken);
            console.log('refreshToken'+refreshToken);
            console.log('profile'+profile);

            amazing.getIDbyToken(accessToken, function(error, response)
            {
              console.log('error'+error);
              console.log('response'+response);
              console.log('email'+response.user.emailAddress);
              console.log( req.user._id+'\\'+response.user.company+'\\'+response.user.username);
              
              eloquaUser.findOne(
              {
                 'id': req.user._id+'\\'+response.user.company+'\\'+response.user.username
              }, function(err, user)
              {
                  console.log('user:'+user);

                  if (err)
                  {
                      return done(err);
                  }
                  if (!user)
                  {
                     // console.log(' != false');
                   
  
                      user = new eloquaUser(
                      {
                          site_id:  response.site.id,
                          meanuser_id  : req.user._id,
                          site_name: response.site.name,
                          user_id: response.user.id,
                          user_username: response.user.username,
                          user_displayName: response.user.displayName,
                          user_emailAddress: response.user.emailAddress,
                          accessToken: accessToken,
                          refreshToken: refreshToken,
                          base_url: response.urls.base,

                          roles: ['authenticated']
                      });
                      user.save(function(err)
                      {
                          if (err) console.log(err);
                          return done(err, user);
                      });
                  }
                  else
                  {
                      return done(err, user);
                  }
              });

              return done(error, response);
            });
          }); 
        }));

        isStrategySetup = true;

      }

      next();
    };
}

*/



};
