'use strict';

// User routes use users controller
var mongoose = require('mongoose');
var EloquaApp = require('../../models/e_app');
var eloquaUser = mongoose.model('eloquaUser');
var eloquaBasicUser = mongoose.model('EloquaBasicUser');
//var eloquaEmail = mongoose.model('EloquaEmail');
//var config = require('../../config/config');
var config = require('meanio').loadConfig();
var async = require('async');
var Eloqua  = require('../../lib/eloqua_request');


var EloquaHelper = function(){};

EloquaHelper.prototype.helloWorld = function()
{
    return 'hello world';
};

EloquaHelper.prototype.createEloquaApp = function(appid, site_name, site_id, install_id, cb)
{

    console.log('createEloquaApp');
    EloquaApp.findOne(
    {
        instanceid: appid
    }, function(err, eapp)
    {
        console.log('createEloquaApp inner callback');
        if (err)
        {
            return cb({'errors':err}, {'success': false});
        }
        if (!eapp)
        {
            var app = new EloquaApp(
            {
                //name: 'app1',
                instanceid  : appid,
                site        : site_name,
                site_id     : site_id,
                install_id  : install_id
            });
            app.save(function(err)
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
};

EloquaHelper.prototype.getEloquaAppByInstance = function(instance, cb)
{
    EloquaApp.findOne(
    {
        instanceid: instance
    },
    function(err, eapp)
    {
        if(eapp)
        {
            return cb(null, eapp);
        }
        else
        {
            return cb({'error': err}, {});
        }
    });
};


EloquaHelper.prototype.getUserByApp = function(eapp, cb)
{
    console.log(eapp);
    eloquaUser.findOne({ site_id: eapp.site_id }, function(err, eloquaUser)
    {
        console.log(err);
        console.log(eloquaUser);
        if(eloquaUser)
        {
            return cb(null, eloquaUser);
        }
        else
        {
            return cb({'error': err}, {});
        }
    });
};


EloquaHelper.prototype.getAccessTokenByUser = function(eloquaUser, cb)
{
    console.log('accessToken: '+eloquaUser.accessToken);
    console.log('refreshToken: '+eloquaUser.refreshToken);
    var eloqua = new Eloqua('Basic '+(new Buffer(config.eloqua.clientID+ ':'+config.eloqua.clientSecret)).toString('base64'), 'https://login.eloqua.com/');

    var refresh_data =
    {
        'grant_type': 'refresh_token',
        'refresh_token' : eloquaUser.refreshToken,
        'scope":' : 'full",',
        'redirect_uri': 'emailAddress'
    };

    eloqua.post('/auth/oauth2/token', refresh_data, function(refresh_err, refresh_response)
    {
        console.log('getAccessTokenByUser callback');
        if(refresh_err)
        {
            console.dir(refresh_err);
            console.dir(refresh_err.msg.failures);
            console.log('eq err:'+refresh_err);
        }
        if(refresh_response)
        {
            console.log('eq response: %j', refresh_response);
            console.log(refresh_response.access_token);

            return cb(null, refresh_response.access_token);
        }
        else
        {
            return cb({'error': refresh_err}, {});
        }
    });

};

EloquaHelper.prototype.getBasicLoginByCompanyAndUsername = function(meanuser_id, company, username, cb)
{
  console.log('getBasicLoginByCompanyAndUsername');
  console.log(meanuser_id+'\\'+company+'\\'+username);

  eloquaBasicUser.findOne(
  {
    id: meanuser_id+'\\'+company+'\\'+username
  }, function(err, basicUser)
  {
    console.log(err);
    console.log(basicUser); 
     cb(err, basicUser);
  });
};

EloquaHelper.prototype.getBasicLoginUP = function(company, username, password, base_url)
{
    console.log('getBasicLoginUP');
    var _company = company;
    var _username = username;
    var _password = password;
    var _loginstr =_company+'\\'+_username+':'+_password;
    var _base_url = '';
    console.log('base_url '+ base_url);
    if(base_url === null)
    {
        _base_url = 'https://secure.eloqua.com';
    }
    else
    {
        _base_url = base_url; 
    }

    console.log('loginstr '+_loginstr);

    var eloqua = new Eloqua('Basic '+(new Buffer(_loginstr).toString('base64')), _base_url);  //https://www02.secure.eloqua.com


    return eloqua;
};


EloquaHelper.prototype.getBasicLogin = function()
{
    console.log('getBasicLogin');
    var _company = 'LeadManagementTeqSolutionsAB';
    var _username = 'Simon.Diel';
    var _password = 'TtF5l6EtTc4Gl9nucNpbWLjX';
    var _loginstr =_company+'\\'+_username+':'+_password;

    console.log('loginstr '+_loginstr);

    var eloqua = new Eloqua('Basic '+(new Buffer(_loginstr).toString('base64')), 'https://secure.eloqua.com');



    return eloqua;
};



EloquaHelper.prototype.get_id = function(myeloqua, cb)
{
    console.log('get id');
   myeloqua.get('/id', function(err, response)
   {
       console.log('callback ->');
        cb(err, response);
    });
};

//var contacts = function(){};

/*contacts.prototype.search = function(search_str, cb)
{
   var myeloqua = EloquaHelper.prototype.getBasicLogin();
    myeloqua.get('/API/REST/1.0/data/contacts?depth=minimal&search=*leadteq.com', function(err, response)
    {
        console.log('callback ->');
        cb(err, response);
    });
};*/

EloquaHelper.prototype.contacts_search = function(myeloqua, search, page, count, depth, cb)
{

   myeloqua.get('/API/REST/1.0/data/contacts?search='+search+'&page='+page+'&count='+count+'&depth='+depth+'', function(err, response)
   {
       console.log('callback ->');
        cb(err, response);
    });
};

EloquaHelper.prototype.getContactById = function(myeloqua, id, depth, viewId, cb)
{
   //myeloqua.get('/API/REST/1.0/data/contact/'+id+'?depth='+depth+'&viewId='+viewId, function(err, response)
    var query = '/API/REST/1.0/data/contact/'+id+'?depth='+depth;
    if(viewId !== undefined)
    {
       query +=  '&viewId='+viewId;
    }

    console.log(query);
    myeloqua.get(query, function(err, response)
    {
       console.log('callback ->');
        cb(err, response);
    });
};

EloquaHelper.prototype.searchContactField= function(myeloqua, search, page, count, depth, cb)
{
    console.log('searchContactField');
    console.log('/API/REST/1.0/assets/contact/fields?depth='+depth+'&search='+search+'&page='+page+'&count='+count+'');
                 ///API/REST/1.0/assets/contact/fields?depth=complete&search=*&page=1&count=250
    myeloqua.get('/API/REST/1.0/assets/contact/fields?depth='+depth+'&search='+search+'&page='+page+'&count='+count+'', function(err, response)
    {
        console.log('callback ->');
        cb(err, response);
    });
};

EloquaHelper.prototype.getContactFieldById = function(myeloqua, id, depth, cb)
{
    console.log('getContactFieldById');
    console.log('/API/REST/1.0/assets/contact/field/'+id+'?depth='+depth);
    myeloqua.get('/API/REST/1.0/assets/contact/field/'+id+'?depth='+depth, function(err, response)
    {
        console.log('callback ->');
        cb(err, response);
    });
};

EloquaHelper.prototype.searchContactViews = function(myeloqua, search, page, count, depth, cb)
{
    console.log('/API/REST/1.0/assets/contact/views/?depth='+depth+'&search='+search+'&page='+page+'&count='+count+'');
     //                         /assets/contact/views?depth={depth}&count={count}&page={page}&search={search}&orderBy={orderBy}&lastUpdatedAt={lastUpdatedAt}
    myeloqua.get('/API/REST/1.0/assets/contact/views?depth='+depth+'&search='+search+'&page='+page+'&count='+count+'', function(err, response)
    {
        console.log('callback ->');
        cb(err, response);
    });
};

EloquaHelper.prototype.getContactViewById = function(myeloqua, id, depth, cb)
{

     //                         /assets/contact/views?depth={depth}&count={count}&page={page}&search={search}&orderBy={orderBy}&lastUpdatedAt={lastUpdatedAt}
    myeloqua.get('/API/REST/1.0/assets/contact/view/'+id+'?depth='+depth, function(err, response)
    {
        console.log('callback ->');
        cb(err, response);
    });
};
//EloquaHelper.prototype.contacts = new contacts();


// ------------------ Landingpages -----------------------------------------------------------------------

EloquaHelper.prototype.landingpages_search = function(myeloqua, search, page, count, depth, cb)
{

   myeloqua.get('/API/REST/1.0/assets/landingPages?search='+search+'&page='+page+'&count='+count+'&depth='+depth+'', function(err, response)
   {
       console.log('callback ->');
        cb(err, response);
    });
};

// ------------------ Emails -----------------------------------------------------------------------

EloquaHelper.prototype.emails_search = function(myeloqua, search, page, count, depth, cb)
{

   myeloqua.get('/API/REST/1.0/assets/emails?search='+search+'&page='+page+'&count='+count+'&depth='+depth+'', function(err, response)
   {
       console.log('callback ->');
        cb(err, response);
    });
};
EloquaHelper.prototype.emailfolders_search = function(myeloqua, search, page, count, depth, cb)
{

   myeloqua.get('/API/REST/1.0/assets/email/folders?earch='+search+'&page='+page+'&count='+count+'&depth='+depth+'', function(err, response)
   {
       console.log('callback ->');
        cb(err, response);
    });
};

EloquaHelper.prototype.prepareInstanceId = function(instance_id)
{
    return instance_id.replace(/-/g , '');
};

EloquaHelper.prototype.updateEmailsInMongoDB = function(data, cb)
{
    console.log('updateEmailsInMongoDB');
    console.log(data);
/*
    if(data !== null && data.elements !== null)
    {
        async.each(data.elements, function(current_email, callback)
        { 
            eloquaEmail.findOne(
            {
                id: current_email.id
            }, function (err, r_email)
            {
                console.log('createEloquaEmail inner callback');
                console.log(err);
                console.log(r_email);
                if (err)
                {
                    return cb({'errors':err}, {'success': false});
                }
                if (!r_email)
                {
                    console.log('creating new email ');
                    var mail = new eloquaEmail(
                    {
                        //name: 'app1',
                        type:               current_email.type,
                        currentStatus:      current_email.currentStatus,
                        id:                 current_email.id,
                        createdAt:          current_email.createdAt,
                        createdBy:          current_email.createdBy,
                        depth:              current_email.depth,
                        folderId:           current_email.folderId,
                        name:               current_email.name,
                        permissions:        current_email.permissions,
                        updatedAt:          current_email.updatedAt,
                        updatedBy:          current_email.updatedBy,
                        bounceBackEmail:    current_email.bounceBackEmail,
                        emailGroup:         current_email.emailGroup,
                        isPlainTextEditable:  current_email.isPlainTextEditable,
                        isTracked:          current_email.isTracked,
                        replyToEmail:       current_email.replyToEmail,
                        replyToName:        current_email.replyToName,
                        sendPlainTextOnly:  current_email.sendPlainTextOnly,
                        senderEmail:        current_email.senderEmail,
                        senderName:         current_email.senderName,
                        style:              current_email.style,
                        subject:            current_email.subject

                    });
                    mail.save(function(err)
                    {
                        console.log('mail save');
                        if (err)
                        {
                            console.log(err);
                        }

                            console.log('mail save sucess');
                        
                        callback();

                    });
                }
                else
                {   
                    console.log('found email '+current_email.id);

                    r_email.currentStatus=      current_email.currentStatus;
                    r_email.depth=              current_email.depth;
                    r_email.folderId=           current_email.folderId;
                    r_email.name=               current_email.name;
                    r_email.permissions=        current_email.permissions;
                    //r_email.createdAt=        current_email.createdAt;
                    r_email.createdBy=          current_email.createdBy;
                    r_email.updatedAt=          current_email.updatedAt;
                    r_email.updatedBy=          current_email.updatedBy;
                    r_email.bounceBackEmail=    current_email.bounceBackEmail;
                    r_email.emailGroup=         current_email.emailGroup;
                    r_email.isPlainTextEditable=  current_email.isPlainTextEditable;
                    r_email.isTracked=          current_email.isTracked;
                    r_email.replyToEmail=       current_email.replyToEmail;
                    r_email.replyToName=        current_email.replyToName;
                    r_email.sendPlainTextOnly=  current_email.sendPlainTextOnly;
                    r_email.senderEmail=        current_email.senderEmail;
                    r_email.senderName=         current_email.senderName;
                    r_email.style=              current_email.style;
                    r_email.subject=            current_email.subject;
                    r_email.save();


 */
            /*
                    _complete = _complete + 1;
                    if(_waiting === _complete)
                    {
                        return cb({}, {'success': true});
                    }*/
/*
                    //return cb({'error':'allready in database'}, {'success': false});
                    callback();
                }
            });
        }, function(err)
        { 
            console.log('updateEmailsInMongoDB each callback');
            if(err === undefined)
            {
                cb(err, {'success': false});
            }
            else
            {
                cb({}, {'success': true});
            }
        } );
*/
       /* for (var i = 0; i < data.elements.length ; i = i +1)
        {
            var current_email = data.elements[i];
            _waiting = _waiting + 1;

            
            eloquaEmail.findOne(
            {
                id: current_email.id
            }, loop_find_one(err, r_email, current_email));
            
        }
    }*/
};



EloquaHelper.prototype.getAllEmailsfromMongoDB = function( cb)
{
    console.log('getAllEmailsfromMongoDB');

/*
    eloquaEmail.find(
    {
    }, function(err, r_emails)
    {
        console.log('createEloquaEmail inner callback');
        console.log(err);
        console.log(r_emails);
        cb(err, {elements: r_emails });
    });     */
};



exports.EloquaHelper = new EloquaHelper();
