'use strict';

/**
 * Module dependencies.
 */
  var EloquaHelper    = require('../controllers/eloqua/EloquaHelper.js').EloquaHelper;
  var mongoose = require('mongoose');
  var eloquaBasicUser = mongoose.model('EloquaBasicUser');
  var eloquaUser = mongoose.model('eloquaUser');


exports.add_new = function(req, res, next, cb)
{
  console.log('/accounts/add_new?');
  console.log('company: '+req.body.company);
  console.log('username: '+req.body.username);
  console.log('password: '+req.body.password);
  //console.log(req);

  var myeloqua = EloquaHelper.getBasicLoginUP(req.body.company, req.body.username, req.body.password, 'https://login.eloqua.com');
  console.log(myeloqua);


  EloquaHelper.get_id(myeloqua, function(id_error, id_response)
  {
    console.log(id_error);
    console.log(id_response);
    var base_url = null;

    console.log('oh yno');
    if(id_response !== null ) 
    {
      console.log('oh yeah');
      console.log(id_response.urls);
    }   

    if(id_response !== null && id_response.urls !== null) 
    {

      base_url = id_response.urls.base;
      myeloqua = EloquaHelper.getBasicLoginUP(req.body.company, req.body.username, req.body.password, base_url);
      console.log('oh yeah');
    }


    EloquaHelper.contacts_search(myeloqua, '*',1,1, 'Minimal', function(error, response)
    //myeloqua.get('/API/REST/1.0/data/contacts?depth=minimal&search=*&page=1&count=1', function(error, response)
    //myeloqua.get('/API/REST/2.0/settings/dashboard/home?depth=complete&extensions=e10', function(error, response)
    {
      console.log(error);
      console.log(response);
      //console.log(database);


      if(error === null)
      {
        console.log(req.user._id);

        eloquaBasicUser.findOne(
        {
          id: req.user._id+'\\'+req.body.company+'\\'+req.body.username
        }, function(err, basicUser)
        {
            console.log('eloquaBasicUser inner callback');

            if (err)
            {
                return cb({'errors':err}, {'success': false});
            }
            if (!basicUser)
            {
                var new_basicUser = new eloquaBasicUser(
                {
                    id  : req.user._id+'\\'+req.body.company+'\\'+req.body.username,
                    meanuser_id  : req.user._id,
                    company      : req.body.company,
                    username     : req.body.username,
                    password     : req.body.password,
                    base_url     : base_url
                });
                new_basicUser.save(function(err)
                {
                    if (err)
                    {
                        console.log(err);
                    }

                    return cb({}, {'success': true});
                });
            }
            else
            {
                return cb({'error':'allready in database'}, {'success': false});
            }
        });
      }
      else
      {
          return cb(error, {'success': false});
      }

    });
 });
};

exports.getAccounts = function(req, res, next, cb)
{
  console.log('/accounts/getAccounts?');
  console.log('company: '+req.body.company);
  console.log('username: '+req.body.username);
  console.log('password: '+req.body.password);
  //console.log(req);


    eloquaBasicUser.find(
    {
      meanuser_id: req.user._id
    }, function(error, basicUsers)
    {
        console.log('eloquaBasicUser inner callback');

        return cb(error, {'users': basicUsers});
    });

};
exports.getApiAccounts = function(req, res, next, cb)
{
  console.log('/accounts/getAccounts?');
  console.log('company: '+req.body.company);
  console.log('username: '+req.body.username);
  console.log('password: '+req.body.password);
  //console.log(req);


    eloquaUser.find(
    {
      meanuser_id: req.user._id
    }, function(error, basicUsers)
    {
        console.log('eloquaBasicUser inner callback');

        return cb(error, {'users': basicUsers});
    });

};
