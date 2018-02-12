'use strict';

var mongoose = require('mongoose'),
  OAuth2Strategy = require('passport-oauth2'),
  eloquaUser = mongoose.model('eloquaUser'),
  config = require('meanio').loadConfig();
var amazing = require('amazing')();
 var https = require('https');


module.exports = function(passport) {
  // Serialize the user id to push into the session

  /*
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // Deserialize the user object based on a pre-serialized token
  // which is the user id
  passport.deserializeUser(function(id, done) {
    User.findOne({
      _id: id
    }, '-salt -hashed_password', function(err, user) {
      done(err, user);
    });
  });
  */



    var eloquaStrategy = new OAuth2Strategy(
        {
            authorizationURL: config.eloqua.authorizationURL,
            tokenURL: config.eloqua.tokenURL,
            clientID: config.eloqua.clientID,
            clientSecret: config.eloqua.clientSecret,
            callbackURL: config.eloqua.callbackURL,
            passReqToCallback: true,
            customHeaders : 
            {
                'Authorization' : 'Basic '+ (new Buffer(config.eloqua.clientID+ ':'+config.eloqua.clientSecret)).toString('base64')
            }
    },
        function(req, accessToken, refreshToken, profile, done)
        {
            console.log('accessToken'+accessToken);
            console.log('refreshToken'+refreshToken);
            console.log('profile'+profile); 

            
            amazing.getIDbyToken(accessToken, function(error, response)
            {
              console.log('error'+error);
              console.log('response'+response);
              console.log('email'+response.user.emailAddress);
              console.log(req.user);
              console.log(req.user._id+'\\'+response.site.name+'\\'+req.user.username);
              
              eloquaUser.findOne(
              {
                id: req.user._id+'\\'+response.site.name+'\\'+response.user.username
              }, function(err, user)
              {
                  console.log('user:'+user);
                  //console.log('profile:'+util.inspect(profile, true, null));
                  //console.dir(profile);
                  //console.log(JSON.stringify(profile));

                  if (err)
                  {
                      return done(err);
                  }
                  if (!user)
                  {
                     // console.log(' != false');
                   
                      user = new eloquaUser(
                      {
                          id  : req.user._id+'\\'+response.site.name+'\\'+response.user.username,
                          site_id:  response.site.id,
                          meanuser_id  : req.user._id,
                          company: response.site.name,
                          user_id: response.user.id,
                          username: response.user.username,
                          user_displayName: response.user.displayName,
                          user_emailAddress: response.user.emailAddress,
                          accessToken: accessToken,
                          refreshToken: refreshToken,
                          base_url: response.urls.base,
                          roles: ['authenticated']
                      });
                      user.save(function(err)
                      { 
                        console.log('+++ API USER created +++')
                        if (err) console.log(err);
                        return done(err, user);
                      });
                  }
                  else
                  {
                      return done(err, user);
                  }
              });

             // return done(error, response);
            });

            
          

        }
    );
/*
    eloquaStrategy.userProfile = function(accessToken, done) 
    {
        var options = 
        {
            host: 'login.eloqua.com',
            port: 443,
            path: '/id',
            method: 'GET',
            headers:
            {
              'Authorization': 'Bearer '+ accessToken
            } 
};
        var request = https.request(options, function(res) 
        {
            console.log('called: '+options.host+''+options.path);
            console.log('Got response: ' + res.statusCode);
            console.dir(res.body);
            //console.dir(res);
        });

        request.on('error', function(e) 
        {
          console.log('Got error: ' + e.message);
          console.dir(e);
          return done(e, null);
        });

        request.on('response', function (response) 
        {
          response.on('data', function (chunk) 
          {
            //console.log('BODY: ' + chunk);
            JSON.parse(chunk);
            return done(null, JSON.parse(chunk));
          });
        });

        request.end();
        console.log('end');
     //   return done(null, 
       //     {abc: 'abc'}
        //    );
    };*/
    passport.use('eloqua', eloquaStrategy);




  
};
