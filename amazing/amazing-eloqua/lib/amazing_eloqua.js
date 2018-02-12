'use strict';

var Eloqua  = require('../resources/eloqua_request');

var _eloqua = null;
var async = require('async');


function AmazingEloqua(accessToken, baseUrl) 
{
	//console.log('AmazingEloqua');
    _eloqua = new Eloqua(accessToken, baseUrl);
    //console.log(_eloqua);

    var Campaign = require('./campaign');

    AmazingEloqua.prototype.campaign = new Campaign(_eloqua);
}

AmazingEloqua.prototype.getElq = function()
{
   return _eloqua;
};

// ------------------ Auth -----------------------------------------------------------------------
AmazingEloqua.prototype.refreshAccessToken = function(refreshToken, cb)
{
    console.log('refreshAccessToken');
    var refresh_data =
    {
        'grant_type': 'refresh_token',
        'refresh_token' : refreshToken,
        'scope":' : 'full",',
        'redirect_uri': 'emailAddress'
    };

    console.log(refresh_data);


    _eloqua.post('/auth/oauth2/token', refresh_data,  function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};

AmazingEloqua.prototype.getId = function(cb)
{
    //console.log('get id');
    //console.log( _eloqua);

    _eloqua.get('/id', function(err, response)
    {
       //console.log('callback ->');
       cb(err, response);
    });
};


// ------------------ Accounts -----------------------------------------------------------------------
AmazingEloqua.prototype.searchAccountQ = function(data, cb)
{
    var path = '';
    if(data.lastModified != undefined && data.lastModified != '')
    {
        path += '&lastUpdatedAt='+data.lastModified
    }

    //console.log(path);

    _eloqua.get('/API/REST/2.0/data/accounts?search='+data.search+'&page='+data.page+'&count='+data.count+'&depth='+data.depth+''+path, function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};

/**
 * @deprecated since version 0.2
 */
AmazingEloqua.prototype.searchAccount = function(search, page, count, depth, cb)
{
    console.warn('this method is deprecated (searchAccount)');

    _eloqua.get('/API/REST/2.0/data/accounts?search='+search+'&page='+page+'&count='+count+'&depth='+depth+'', function(err, response)
    {
        cb(err, response);
    });
};

AmazingEloqua.prototype.getAccountById = function(id, depth, viewId, cb)
{
    var query = '/API/REST/2.0/data/account/'+id+'?depth='+depth;
    if(viewId !== undefined)
    {
       query +=  '&viewId='+viewId;
    }

    _eloqua.get(query, function(err, response)
    {
        cb(err, response);
    });

};

AmazingEloqua.prototype.createAccount = function(data, cb)
{
    var query = '/API/REST/2.0/data/account';
  
    //console.log(query);
    _eloqua.post(query, data, function(err, response)
    {
        cb(err, response);
    });
};

AmazingEloqua.prototype.updateAccount = function(id, data, cb)
{
    var query = '/API/REST/2.0/data/account/'+id;
  
    //console.log(query);
    _eloqua.put(query, data, function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};

AmazingEloqua.prototype.deleteAccount = function(id, cb)
{
    var query = '/API/REST/1.0/data/account/'+id;
  
    //console.log(query);
    _eloqua.remove(query, function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};

AmazingEloqua.prototype.getAccountMetaData = function(cb)
{
    _eloqua.get('/API/REST/1.0/assets/account/fields?count=100', function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};

// ------------------ Contacts -----------------------------------------------------------------------

AmazingEloqua.prototype.searchContactsQ = function(data, cb)
{
    var path = '';
    if(data.lastModified != undefined && data.lastModified != '')
    {
        path += '&lastUpdatedAt='+data.lastModified
    }
    _eloqua.get('/API/REST/1.0/data/contacts?search='+data.search+'&page='+data.page+'&count='+data.count+'&depth='+data.depth+''+path, function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};
AmazingEloqua.prototype.searchContacts = function(search, page, count, depth, cb)
{   
    var path = '/API/REST/1.0/data/contacts?search='+search+'&page='+page+'&count='+count+'&depth='+depth;
    //console.log(path);
    _eloqua.get(path, function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};

AmazingEloqua.prototype.getContactById = function(id, depth, viewId, cb)
{
   //myeloqua.get('/API/REST/1.0/data/contact/'+id+'?depth='+depth+'&viewId='+viewId, function(err, response)
    var query = '/API/REST/1.0/data/contact/'+id+'?depth='+depth;
    if(viewId !== undefined)
    {
       query +=  '&viewId='+viewId;
    }

    //console.log(query);
    _eloqua.get(query, function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};

AmazingEloqua.prototype.createContact = function(data, cb)
{
    var query = '/API/REST/2.0/data/contact';
  
    //console.log(query);
    _eloqua.post(query, data, function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });

};

AmazingEloqua.prototype.updateContact = function(id, data, cb)
{
    var query = '/API/REST/2.0/data/contact/'+id;
  
    //console.log(query);
    _eloqua.put(query, data, function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};

AmazingEloqua.prototype.updateContact1 = function(obj, cb)
{
    var query = '/API/REST/2.0/data/contact/'+obj.id;
  
    //console.log(query);
    _eloqua.put(query, obj.data, function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};

AmazingEloqua.prototype.deleteContact = function(id, cb)
{
    var query = '/API/REST/1.0/data/contact/'+id;
  
    //console.log(query);
    _eloqua.remove(query, function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};

AmazingEloqua.prototype.searchContactField= function(search, page, count, depth, cb)
{
    //console.log('searchContactField');
    //console.log('/API/REST/1.0/assets/contact/fields?depth='+depth+'&search='+search+'&page='+page+'&count='+count+'');
                 ///API/REST/1.0/assets/contact/fields?depth=complete&search=*&page=1&count=250
    _eloqua.get('/API/REST/1.0/assets/contact/fields?depth='+depth+'&search='+search+'&page='+page+'&count='+count+'', function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};

AmazingEloqua.prototype.getContactMetaData = function(cb)
{
    _eloqua.get('/API/REST/1.0/assets/contact/fields?count=250', function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};

AmazingEloqua.prototype.getContactFieldById = function(id, depth, cb)
{
    //console.log('getContactFieldById');
    //console.log('/API/REST/1.0/assets/contact/field/'+id+'?depth='+depth);
    _eloqua.get('/API/REST/1.0/assets/contact/field/'+id+'?depth='+depth, function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};

AmazingEloqua.prototype.searchContactViews = function(search, page, count, depth, cb)
{
    //console.log('/API/REST/1.0/assets/contact/views/?depth='+depth+'&search='+search+'&page='+page+'&count='+count+'');
     //                         /assets/contact/views?depth={depth}&count={count}&page={page}&search={search}&orderBy={orderBy}&lastUpdatedAt={lastUpdatedAt}
    _eloqua.get('/API/REST/1.0/assets/contact/views?depth='+depth+'&search='+search+'&page='+page+'&count='+count+'', function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};

AmazingEloqua.prototype.getContactViewById = function(id, depth, cb)
{
    //  /assets/contact/views?depth={depth}&count={count}&page={page}&search={search}&orderBy={orderBy}&lastUpdatedAt={lastUpdatedAt}
    _eloqua.get('/API/REST/1.0/assets/contact/view/'+id+'?depth='+depth, function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};
//EloquaHelper.prototype.contacts = new contacts();

// ------------------ Subscriptions -----------------------------------------------------------------------

AmazingEloqua.prototype.getContactSubscriptionsById = function(id, cb)
{
    var query = '/API/REST/2.0/data/contact/'+id+'/email/groups/subscription?page=1&count=50&depth=complete&orderBy=name ASC';

    console.log(query);
    _eloqua.get(query, function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};

AmazingEloqua.prototype.getContactSubscriptionByIdAndGroupId = function(contactId, groupId, cb)
{
   //myeloqua.get('/API/REST/1.0/data/contact/'+id+'?depth='+depth+'&viewId='+viewId, function(err, response)
    var query = '/API/REST/2.0/data/contact/'+contactId+'/email/group/'+groupId+'/subscription';

    //console.log(query);
    _eloqua.get(query, function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};

AmazingEloqua.prototype.updateContactGroupSubscription = function(contactId, groupId, data, cb)
{
   //myeloqua.get('/API/REST/1.0/data/contact/'+id+'?depth='+depth+'&viewId='+viewId, function(err, response)
    var query = '/API/REST/2.0/data/contact/'+contactId+'/email/group/'+groupId+'/subscription';

    //console.log(query);
    _eloqua.put(query, data, function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};

// ------------------ Landingpages -----------------------------------------------------------------------

AmazingEloqua.prototype.searchLandingpages = function(search, page, count, depth, cb)
{
    _eloqua.get('/API/REST/1.0/assets/landingPages?search='+search+'&page='+page+'&count='+count+'&depth='+depth+'', function(err, response)
    {
        
        //console.log('callback ->');
        cb(err, response);
    });
};

// ------------------ Form Data -----------------------------------------------------------------------

AmazingEloqua.prototype.getForm = function(formId, cb)
{
    _eloqua.get('/API/REST/1.0/assets/form/'+formId+'', function(err, response)
    {
        
        //console.log('callback ->');
        cb(err, response);
    });
};


AmazingEloqua.prototype.createFormData = function(formId, fieldValues, cb)
{
    var query = '/API/REST/2.0/data/form/'+formId;

    var data = 
    {
        "id": formId,
        "fieldValues": fieldValues
    };
  
    //console.log(query);
    _eloqua.post(query, data, function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};


// ------------------ Emails -----------------------------------------------------------------------

AmazingEloqua.prototype.searchEmails = function(search, page, count, depth, cb)
{
    _eloqua.get('/API/REST/1.0/assets/emails?search='+search+'&page='+page+'&count='+count+'&depth='+depth+'', function(err, response)
    {
       	//console.log('callback ->');
        cb(err, response);
    });
};

AmazingEloqua.prototype.searchEmailFolders = function(search, page, count, depth, cb)
{
    _eloqua.get('/API/REST/1.0/assets/email/folders?earch='+search+'&page='+page+'&count='+count+'&depth='+depth+'', function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};

AmazingEloqua.prototype.getEmailById = function(id, depth, cb)
{
    _eloqua.get('/API/REST/1.0/assets/email/'+id+'?depth='+depth+'', function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};

AmazingEloqua.prototype.getEmailEncoding = function(depth, cb)
{
    _eloqua.get('/API/REST/1.0/assets/email/encodings?depth='+depth+'', function(err, response)
    {
        console.log('callback ->');
        cb(err, response);
    });
};

AmazingEloqua.prototype.sendInlineEmail = function(contacts, html, subject, name, deployname,  cb)
{
    //https://community.oracle.com/community/topliners/code-it/blog/2012/10/12/eloqua-rest-api--sending-email
    var email_data =
    {  
        'clickthroughCount': null,  
        'contacts': contacts,  
        'openCount': null,  
        'sendFromUserId': null,  
        'email': {  
        'htmlContent': {  
          'type': 'RawHtmlContent',  
          'html': html 
        },  
        'id': null,  
        'isPlainTextEditable': false,  
        'name': name,  
        'plainText': null,  
        'sendPlainTextOnly': false,  
        'subject': subject 
      },  
      'endAt': '0001-01-01T05:00:00Z',  
      'failedSendCount': null,  
      'name': deployname,  
      'sentSubject': null,  
      'successfulSendCount': null,  
      'type': 'EmailInlineDeployment'  
    };

    console.log(email_data);

    _eloqua.post('/API/REST/1.0/assets/email/deployment', email_data, function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};

AmazingEloqua.prototype.sendTestEmail = function(contactId, emailId, deployname,  cb)
{
    console.log('sendTestEmail('+contactId+', '+emailId+', '+deployname+')');
    _eloqua.get('/API/REST/1.0/assets/email/'+emailId+'?depth=complete', function(emailErr, emailResponse)
    {
        //console.log('callback ->');
       console.log(emailErr);
       console.log(emailResponse);

        //https://community.oracle.com/community/topliners/code-it/blog/2012/10/12/eloqua-rest-api--sending-email
        var email_data =
        {   
          'contactId': contactId,  
          'email': 
          {        
            'id': emailResponse.id,  
            'name': emailResponse.name,  
            'emailFooterId': emailResponse.emailFooterId,  
            'emailHeaderId': emailResponse.emailHeaderId,  
            'encodingId': emailResponse.encodingId,  
            'emailGroupId': emailResponse.emailGroupId,  
            'subject': emailResponse.subject, 
            'htmlContent': 
            {  
              'type': 'RawHtmlContent',  
              'html': emailResponse.htmlContent.html 
            }  
          },  
          'name': deployname,  
          'type': 'EmailTestDeployment'  
        };

        console.log('.....');
        console.log(email_data);

        _eloqua.post('/API/REST/1.0/assets/email/deployment', email_data, function(err, response)
        {
            //console.log('callback ->');
            cb(err, response);
        });
    });
};


AmazingEloqua.prototype.createHTMLEmail = function(name, folderId, emailFooterId, emailHeaderId, emailGroupId, encodingId, subject, html, fromAddress, senderName, bounceBackEmail, replyToName, replyToEmail, cb)
{
    //https://community.oracle.com/community/topliners/code-it/blog/2012/10/12/eloqua-rest-api--sending-email
    var data =
    {
        "name": name,
        "folderId": folderId,
        "emailFooterId": emailFooterId,
        "emailHeaderId": emailHeaderId,
        "encodingId": 1,
        "emailGroupId": emailGroupId,
        "subject": subject,
        "isTracked": 1,
        "htmlContent": {
            "type": "RawHtmlContent",
            "html": html
            }
    }

    if(encodingId != undefined && encodingId != null)
    {
        data.encodingId = encodingId;
    }

    if(bounceBackEmail && bounceBackEmail != undefined && bounceBackEmail != '')
    {
        data['bounceBackEmail'] = bounceBackEmail;
    }  

    if(replyToName && replyToName != undefined && replyToName != '')
    {
        data['replyToName'] = replyToName;
    }    

    if(replyToEmail && replyToEmail != undefined && replyToEmail != '')
    {
        data['replyToEmail'] = replyToEmail;
    }    

    if(fromAddress && fromAddress != undefined && fromAddress != '')
    {
        data['senderEmail'] = fromAddress;
    }  
    if(senderName && senderName != undefined && senderName != '')
    {
        data['senderName'] = senderName;
    }

    _eloqua.post('/API/REST/2.0/assets/email', data, function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};

AmazingEloqua.prototype.updateHTMLEmail = function(id, name, folderId, emailFooterId, emailHeaderId, emailGroupId, encodingId, subject, html, fromAddress, senderName, bounceBackEmail, replyToName, replyToEmail, cb)
{
    //https://community.oracle.com/community/topliners/code-it/blog/2012/10/12/eloqua-rest-api--sending-email
    var data =
    {
        "id": id,
        "name": name,
        "folderId": folderId,
        "emailFooterId": emailFooterId,
        "emailHeaderId": emailHeaderId, 
        "encodingId": 1,
        "emailGroupId": emailGroupId,
        "subject": subject,
        "isTracked": 1,
        "htmlContent": {
            "type": "RawHtmlContent",
            "html": html
            }
    }
    
    if(encodingId != undefined && encodingId != null)
    {
        data.encodingId = encodingId;
    }


    if(bounceBackEmail && bounceBackEmail != undefined && bounceBackEmail != '')
    {
        data['bounceBackEmail'] = bounceBackEmail;
    }      

    if(replyToName && replyToName != undefined && replyToName != '')
    {
        data['replyToName'] = replyToName;
    }  
       
    if(replyToEmail && replyToEmail != undefined && replyToEmail != '')
    {
        data['replyToEmail'] = replyToEmail;
    }     

    if(fromAddress && fromAddress != undefined && fromAddress != '')
    {
        data['senderEmail'] = fromAddress;
    }  

    if(senderName && senderName != undefined && senderName != '')
    {
        data['senderName'] = senderName;
    }
    //console.log(data);

    _eloqua.put('/API/REST/2.0/assets/email/'+id, data, function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};

AmazingEloqua.prototype.scheduleEmail = function(id, startAt, scheduledFor, endAt, cb)
{
    //https://community.oracle.com/community/topliners/code-it/blog/2012/10/12/eloqua-rest-api--sending-email
    var data =
    {
        "id": id,
        "startAt": startAt,
        "scheduledFor": scheduledFor,
        "endAt": endAt
    }
    //console.log(data);

    _eloqua.put('/API/REST/2.0/assets/email/'+id, data, function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};



// ------------------ EmailGroups -----------------------------------------------------------------------

AmazingEloqua.prototype.searchEmailGroups = function(search, page, count, depth, cb)
{
    _eloqua.get('/API/REST/1.0/assets/email/groups?search='+search+'&page='+page+'&count='+count+'&depth='+depth+'', function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};

// ------------------ EmailHeaders -----------------------------------------------------------------------

AmazingEloqua.prototype.searchEmailHeaders = function(search, page, count, depth, cb)
{
    _eloqua.get('/API/REST/1.0/assets/email/headers?search='+search+'&page='+page+'&count='+count+'&depth='+depth+'', function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};


// ------------------ EmailHeaders -----------------------------------------------------------------------

AmazingEloqua.prototype.searchEmailFooters = function(search, page, count, depth, cb)
{
    _eloqua.get('/API/REST/1.0/assets/email/footers?search='+search+'&page='+page+'&count='+count+'&depth='+depth+'', function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};


// ------------------ Campaigns -----------------------------------------------------------------------



// ------------------ Segments -------------------------------------------------------------------
AmazingEloqua.prototype.searchSegments = function(search, page, count, depth, cb)
{
    _eloqua.get('/API/REST/2.0/assets/contact/segments?search='+search+'&page='+page+'&count='+count+'&depth='+depth+'', function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};


AmazingEloqua.prototype.getSegmentsByFolderId = function(id, page, count, depth, cb)
{
    //https://secure.p02.eloqua.com/API/REST/2.0/assets/contact/segment/folder/313/contents?search=x_e10_isTemplate!=true&page=1&count=300&depth=minimal&xsrfToken=ce787e57-3ab8-46bd-8f17-733b01230b04&extensions=e10
    _eloqua.get('/API/REST/2.0/assets/contact/segment/folder/'+id+'/contents?search=x_e10_isTemplate!=true&page='+page+'&count='+count+'&depth='+depth+'', function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};


// ------------------ CDOs -----------------------------------------------------------------------

AmazingEloqua.prototype.getCDOMetaData = function(id, cb)
{
    _eloqua.get('/API/REST/1.0/assets/customObject/'+id+'?depth=complete', function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};


AmazingEloqua.prototype.getCDORecordsQ = function(data, cb)
{
    var path = '';
    //_eloqua.get('/API/REST/2.0/data/customObject/'+id+'?count='+count+'&page='+page+'&search='+search, function(err, response)
    //path = id+'?search='+search;
    path = data.id;
    /*if(data.search != null)
    {
        path +='search='data.search;
    }*/
    //console.log(path);
    _eloqua.get('/API/REST/1.0/data/customObject/'+path, function(err, response)
    //_eloqua.get('/API/REST/1.0/data/customObject/'+id, function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};

AmazingEloqua.prototype.getCDORecordsS = function(data, cb)
{
    var path = '';
    //_eloqua.get('/API/REST/2.0/data/customObject/'+id+'?count='+count+'&page='+page+'&search='+search, function(err, response)
    //path = id+'?search='+search;
    path = data.id;
    if(data.search != null)
    {
        path +='/instances?search='+data.search;
    }
    //console.log(path);
    _eloqua.get('/API/REST/2.0/data/customObject/'+path, function(err, response)
    //_eloqua.get('/API/REST/1.0/data/customObject/'+id, function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};

AmazingEloqua.prototype.getCDORecords = function(id, search, page, count, depth, cb)
{
    var path = '';
    //_eloqua.get('/API/REST/2.0/data/customObject/'+id+'?count='+count+'&page='+page+'&search='+search, function(err, response)
    //path = id+'?search='+search;
    path = id;
    //console.log(path);
    _eloqua.get('/API/REST/1.0/data/customObject/'+path, function(err, response)
    //_eloqua.get('/API/REST/1.0/data/customObject/'+id, function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};

AmazingEloqua.prototype.createCDORecord = function(id, data, cb)
{
    _eloqua.post('/API/REST/1.0/data/customObject/'+id, data, function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};

AmazingEloqua.prototype.getCDORecordById = function(id, instanceId, cb)
{
    console.log('/API/REST/2.0/data/customObject/'+id+'/instance/'+instanceId);
    _eloqua.get('/API/REST/2.0/data/customObject/'+id+'/instance/'+instanceId, function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};

AmazingEloqua.prototype.deleteCDORecord = function(id, instanceId, cb)
{   
    console.log('/API/REST/2.0/data/customObject/'+id+'/instance/'+instanceId);
    _eloqua.get('/API/REST/2.0/data/customObject/'+id+'/instance/'+instanceId, function(err, response)
    {
        //console.log('callback ->');
        cb(err, response);
    });
};


AmazingEloqua.prototype.bulkCDOCreateImport = function(id, dictonary, cb)
{
    console.log('bulkCDOCreateImport('+id+')');
    _eloqua.post('/API/Bulk/2.0/customobjects/'+id+'/imports', dictonary, function(err, response)
    {   
        //console.log('cb imports');
        //console.log(response);
        if(err == null)
        {
            cb(err, response.uri);
        }
        else
        {
            console.log('-----------ERROR --------------------');
            console.error(err);
            console.error(err.msg.failures);
            cb(err, null);
        }
    });
};

AmazingEloqua.prototype.bulkCDOUploadData = function(uploadUrl, data, cb)
{
    _eloqua.post('/API/Bulk/2.0'+uploadUrl+'/data', data, function(sync_err, sync_response)
    {   
        //console.log('upload cb');
        if(sync_err)
        {
            //console.dir(sync_err);
            //console.log('eq err:'+sync_err);
            if(sync_err.code && sync_err.code == 204)
            {
                return cb(null, uploadUrl);
            }
        }

        return cb(sync_err, null, null);             
             
    });
};

AmazingEloqua.prototype.bulkCDOSync = function(syncUrl, cb)
{
    var sync_data = 
    {
        'syncedInstanceUri' : syncUrl
    };

    _eloqua.post('/API/Bulk/2.0/syncs', sync_data, function(sync_err, sync_response)
    {   
        if(sync_err)
        {
            console.dir(sync_err);
            console.log('eq err:'+sync_err);
        }
        return cb(sync_err, sync_response);    
    });
};

AmazingEloqua.prototype.bulkCDOCheckSync = function(checkUrl, cb)
{
   _eloqua.get('/API/Bulk/2.0/'+checkUrl, function(checkSyncErr, check_sync_response)
    {   
        //console.log('check cb');
        if(checkSyncErr)
        {
            console.dir(checkSyncErr);
            //console.dir(sync_err.msg.failures);
            console.log('eq err:'+checkSyncErr);
        }

      //  console.log('eq response: %j', check_sync_response);

        return cb(checkSyncErr, check_sync_response);    
    });
};

AmazingEloqua.prototype.bulkCreateCDORecords = function(id, dictonary, data, cb)
{ 
    //console.log('/bulkCreateCDORecords?');

    async.waterfall(
    [
        function(callback)
        {
            //console.log('import');         
            _eloqua.post('/API/Bulk/2.0/customobjects/'+id+'/imports', dictonary, function(err, response)
            {   
                //console.log('cb imports');
                //console.log(response);
                if(err == null)
                {
                    callback(err, response.uri);
                }
                else
                {
                    console.log('-----------ERROR --------------------');
                    console.error(err);
                    console.error(err.msg.failures);
                    callback(err, null);
                }
            });
        },
        function(uploadUrl, callback)
        {
            //console.log('upload '+uploadUrl);

            _eloqua.post('/API/Bulk/2.0'+uploadUrl+'/data', data, function(sync_err, sync_response)
            {   
                //console.log('upload cb');
                if(sync_err)
                {
                    //console.dir(sync_err);
                    //console.log('eq err:'+sync_err);
                    if(sync_err.code && sync_err.code == 204)
                    {
                        return callback(null, uploadUrl);
                    }
                }

                return callback(sync_err, null, null);             
                     
            });
        },
        function(sync_url, callback)
        {
            //console.log('sync '+sync_url);

            var sync_data = 
                {
                    'syncedInstanceUri' : sync_url
                };

            _eloqua.post('/API/Bulk/2.0/syncs', sync_data, function(sync_err, sync_response)
            {   
                if(sync_err)
                {
                    console.dir(sync_err);
                    console.log('eq err:'+sync_err);
                }
                return callback(sync_err, sync_response);
                     
            });
        },
        function(response, callback)
        {
            //console.log('check');
            _eloqua.get('/API/Bulk/2.0/'+response.uri, function(check_sync_err, check_sync_response)
            {   
                //console.log('check cb');
                if(check_sync_err)
                {
                    console.dir(check_sync_err);
                    //console.dir(sync_err.msg.failures);
                    console.log('eq err:'+check_sync_err);
                }

                //console.log('eq response: %j', check_sync_response);
                /*
                if(check_sync_response.status == 'pending')
                {
                    console.log('retrying');
                    async.retry({times: 5, interval: 1000}, function(retryCallback, results)
                    {
                        console.log('retry');
                        _eloqua.get('/API/Bulk/2.0/'+response.uri, function(check_sync_err2, check_sync_response2)
                        {   
                            console.log('retry callback');
                          
                            if(check_sync_err2 == null)
                            {
                                console.dir(check_sync_err2);
                                console.log('eq response: %j', check_sync_response.status);
                                if(check_sync_response2.status == 'pending')
                                {
                                    return retryCallback(null, check_sync_response2);
                                }
                                else
                                {
                                    return retryCallback(true, null);
                                }
                            }
                            else
                            {
                                console.error('error '+check_sync_err2);
                                return retryCallback(true, null);
                            }
                        });
                    }, function(err, result) 
                    {
                        console.log('ENDE');
                        return callback(err, result);    
                    });
                }
                else
                {
                    console.log('status  != pending');
                    return callback(check_sync_err, check_sync_response);    
                }  */
                return callback(check_sync_err, check_sync_response);    
            });
        }
        /*,
        function(response, callback)
        {
            var exportId = response.uri.replace('syncs/', '');

            _eloqua.get('/API/Bulk/2.0/activities/exports/'+exportId+'/data', function(getExportError, getExportResponse)
            {  
               return callback(getExportError, getExportResponse);
            });
        }*/
    ], 
    function (err, check_sync_response) 
    {
        //console.log('end of the waterfall');
        //console.log( err);
        //console.log( check_sync_response);
     //   console.log('errors: %j', err);
     //   console.log('response: %j', check_sync_response);

        cb(err, check_sync_response);
    });
};

AmazingEloqua.prototype.getCdoImports = function(cdoId, cb)
{
    _eloqua.get('/API/Bulk/2.0/customobjects/'+cdoId+'/imports', cb);
};

AmazingEloqua.prototype.getContactImports = function(cb)
{
    _eloqua.get('/API/Bulk/2.0/contacts/imports', cb);
};

AmazingEloqua.prototype.removeCdoImport = function(cdoId, id, cb)
{
    _eloqua.remove('/API/Bulk/2.0/customobjects/'+cdoId+'/imports/'+id, cb);
};

AmazingEloqua.prototype.checkSync = function(url, cb)
{
    _eloqua.get('/API/Bulk/2.0/'+url, cb);
}


AmazingEloqua.prototype.getSyncLogs = function(id, cb)
{
    _eloqua.get('/API/Bulk/2.0/syncs/'+id+'/logs', cb);
}

AmazingEloqua.prototype.getSyncRejects = function(id, cb)
{
    _eloqua.get('/API/Bulk/2.0/syncs/'+id+'/rejects?limit=100', cb);
}

AmazingEloqua.prototype.getExportsData = function(exportId, cb)
{
     _eloqua.get('/API/Bulk/2.0/activities/exports/'+exportId+'/data', cb);
}


// ------------------------------------------------------------------------------------------------------
AmazingEloqua.prototype.getActivites = function(activityType, startDate, endDate, cb)
{ 
    console.log('/getActivites?');


    async.waterfall(
    [
        function(callback)
        {
            console.log('import');
            var post_data = 
            {
                //"filter": "'{{Activity.Type}}'='EmailOpen'",

                "filter": "'{{Activity.Type}}'='"+activityType+"' AND '{{Activity.CreatedAt}}'>='"+startDate+"T00:00:00Z' AND '{{Activity.CreatedAt}}'<'"+endDate+"T00:00:00Z'",
                "name": "Bulk Activity Export -"+activityType,
                "fields": 
                {
                    "ActivityId": "{{Activity.Id}}",
                    "ActivityType": "{{Activity.Type}}",
                    "ActivityDate": "{{Activity.CreatedAt}}",
                    "EmailAddress": "{{Activity.Field(EmailAddress)}}",
                    "ContactId": "{{Activity.Contact.Id}}",
                    "IpAddress": "{{Activity.Field(IpAddress)}}",
                    "VisitorId": "{{Activity.Visitor.Id}}",
                    "VisitorExternalId": "{{Activity.Visitor.ExternalId}}",
                    "EmailRecipientId": "{{Activity.Field(EmailRecipientId)}}",
                    "AssetType": "{{Activity.Asset.Type}}",
                    "AssetName": "{{Activity.Asset.Name}}",
                    "AssetId": "{{Activity.Asset.Id}}",
                    "SubjectLine": "{{Activity.Field(SubjectLine)}}",
                    "EmailWebLink": "{{Activity.Field(EmailWebLink)}}",
                    "CampaignId": "{{Activity.Campaign.Id}}",
                    "ExternalId": "{{Activity.ExternalId}}",
                    "EmailSendType": "{{Activity.Field(EmailSendType)}}"
                }
            };

            if(activityType == 'EmailSend')
            {
                post_data['fields'] = 
                {
                    "ActivityId": "{{Activity.Id}}",
                    "ActivityType": "{{Activity.Type}}",
                    "ActivityDate": "{{Activity.CreatedAt}}",
                    "EmailAddress": "{{Activity.Field(EmailAddress)}}",
                    "ContactId": "{{Activity.Contact.Id}}",
                    "EmailRecipientId": "{{Activity.Field(EmailRecipientId)}}",
                    "AssetType": "{{Activity.Asset.Type}}",
                    "AssetId": "{{Activity.Asset.Id}}",
                    "AssetName": "{{Activity.Asset.Name}}",
                    "SubjectLine": "{{Activity.Field(SubjectLine)}}",
                    "EmailWebLink": "{{Activity.Field(EmailWebLink)}}",
                    "CampaignId": "{{Activity.Campaign.Id}}",
                    "ExternalId":"{{Activity.ExternalId}}",
                    "DeploymentId": "{{Activity.Field(EmailDeploymentId)}}",
                    "EmailSendType": "{{Activity.Field(EmailSendType)}}"
                }
            }

            if(activityType == 'Unsubscribe')
            {
                post_data['fields'] = 
                {
                   "ActivityId":"{{Activity.Id}}",
                   "ActivityType":"{{Activity.Type}}",
                   "AssetId":"{{Activity.Asset.Id}}",
                   "ActivityDate":"{{Activity.CreatedAt}}",
                   "EmailAddress":"{{Activity.Field(EmailAddress)}}",
                   "EmailRecipientId":"{{Activity.Field(EmailRecipientId)}}",
                   "AssetType":"{{Activity.Asset.Type}}",
                   "AssetName":"{{Activity.Asset.Name}}",
                   "CampaignId":"{{Activity.Campaign.Id}}",
                    "ExternalId":"{{Activity.ExternalId}}"
                }
            }

            console.log(post_data);
           
            _eloqua.post('/API/Bulk/2.0/activities/exports', post_data, function(err, response)
            {   
                if(err == null)
                {
                    callback(err, response.uri, response);
                }
                else
                {
                    console.error(err);
                    console.error(err.msg.failures);
                    callback(err, null, null);
                }
            });
        },
    
        function(sync_url, response, callback)
        {
            console.log('sync '+sync_url);

            var sync_data = 
                {
                    'syncedInstanceUri' : sync_url
                };

            _eloqua.post('/API/Bulk/2.0/syncs', sync_data, function(sync_err, sync_response)
            {   
                if(sync_err)
                {
                    console.dir(sync_err);
                    console.log('eq err:'+sync_err);
                }
                return callback(sync_err, sync_response);
                     
            });
        },
        function(response, callback)
        {
            console.log('check');
            _eloqua.get('/API/Bulk/2.0/'+response.uri, function(check_sync_err, check_sync_response)
            {   
                if(check_sync_err)
                {
                    console.dir(check_sync_err);
                    //console.dir(sync_err.msg.failures);
                    console.log('eq err:'+check_sync_err);
                }

                console.log('eq response: %j', check_sync_response);
                if(check_sync_response.status == 'pending')
                {
                    console.log('retrying');
                    async.retry({times: 5, interval: 1000}, function(retryCallback, results)
                    {
                        console.log('retry');
                        _eloqua.get('/API/Bulk/2.0/'+response.uri, function(check_sync_err2, check_sync_response2)
                        {   
                            console.log('retry callback');
                          
                            if(check_sync_err2 == null)
                            {
                                console.dir(check_sync_err2);
                                console.log('eq response: %j', check_sync_response.status);
                                if(check_sync_response2.status == 'pending')
                                {
                                    return retryCallback(null, check_sync_response2);
                                }
                                else
                                {
                                    return retryCallback(true, null);
                                }
                            }
                            else
                            {
                                console.error('error '+check_sync_err2);
                                return retryCallback(true, null);
                            }
                        });
                    }, function(err, result) 
                    {
                        console.log('ENDE');
                        return callback(err, result);    
                    });
                }
                else
                {
                    console.log('status  != pending');
                    return callback(check_sync_err, check_sync_response);    
                }  
            });
        },
        function(response, callback)
        {
            var exportId = response.uri.replace('syncs/', '');

            _eloqua.get('/API/Bulk/2.0/activities/exports/'+exportId+'/data', function(getExportError, getExportResponse)
            {  
               return callback(getExportError, getExportResponse);
            });
        }
    ], 
    function (err, check_sync_response) 
    {
        console.log('end of the waterfall');
     //   console.log('errors: %j', err);
     //   console.log('response: %j', check_sync_response);

        cb(err, check_sync_response);
    });

}


AmazingEloqua.prototype.getActivitesQ = function(id, cb)
{
    var path ='/API/REST/1.0/data/activities/contact/'+id+'?type=emailSend&startDate=1262304000&endDate=1462858082';
    console.log(path);
    _eloqua.get(path, cb);
}

AmazingEloqua.prototype.getActivitesFromTo= function(id, type, from, to, cb)
{
    var path ='/API/REST/1.0/data/activities/contact/'+id+'?type='+type+'&startDate='+from+'&endDate='+to+'';
    console.log(path);
    _eloqua.get(path, cb);
}

AmazingEloqua.prototype.getActivites2FromTo= function(id, type, from, to, cb)
{
             ///API/REST/2.0/data/activities/contact/2125537/emailUnSubscribe?startAt=1475779484&endAt=1476384284&page=1&count=1000&xsrfToken=572784db-d9d6-484c-9a05-ecb0d298d29d&extensions=e10
    var path ='/API/REST/2.0/data/activities/contact/'+id+'/'+type+'?startAt='+from+'&endAt='+to+'';
    console.log(path);
    _eloqua.get(path, cb);
}

AmazingEloqua.prototype.getExternalActivity = function(id, cb)
{
    var path ='/API/REST/2.0/data/activity/'+id+'';
    console.log(path);
    _eloqua.get(path, cb);
}

AmazingEloqua.prototype.getExternalActivities = function(id, from, to, cb)
{
    var path ='/API/REST/2.0/data/activities/contact/'+id+'/externalActivity?startAt='+from+'&endAt='+to+''
    console.log(path);
    _eloqua.get(path, cb);
}


AmazingEloqua.prototype.getOptionlistById = function(id, cb)
{
    var path ='/API/REST/1.0/assets/optionList/'+id;
    console.log(path);
    _eloqua.get(path, cb);
}

AmazingEloqua.prototype.getOptionlists = function(count, cb)
{
    var path ='/API/REST/1.0/assets/optionLists?count='+count;
    console.log(path);
    _eloqua.get(path, cb);
}





module.exports = function(accessToken, baseUrl) 
{
	return new AmazingEloqua(accessToken, baseUrl);
}
