'use strict';

var _gitlab;
var _projectId;

function AmazingGit() 
{
    console.log('Amazing-Git');

    _gitlab = require('gitlab')(
    {
  		url:   'https://gitlab.com',
  		token: 'Y3PkteH1E2h6QsuHbYJA'
	});

	_projectId = 257630;
}



AmazingGit.prototype.createEmail = function(name, content, msg, cb)
{
	_gitlab.projects.repository.createFile(
  	{
	    projectId: _projectId,
	    file_path: 'emails/'+name,
	    encoding: 'text',
	    branch_name : 'master',
	    content: content,
	    commit_message: msg
  	}, function(res) 
  	{
    	//console.log('=== File ===');
    	//console.log(res);
    	if(res === true)
    	{
    		cb(null, res);
    	}
    	else
    	{
    		cb(res, null);
    	}
   	});
};

AmazingGit.prototype.updateEmail = function(name, content, msg, cb)
{
	console.log('updateEmail');
	//console.log(name);
	//console.log(content);
	//console.log(msg);
	_gitlab.projects.repository.updateFile(
  	{
	    projectId: _projectId,
	    file_path: 'emails/'+name,
	    encoding: 'text',
	    branch_name : 'master',
	    content: content,
	    commit_message: msg
  	}, function(res) 
  	{

  		console.log('updatefile:');
  		console.log(res);
    	if(res !== null && res.file_name !== null)
    	{
    		return cb(null, res);
    	}
    	else
    	{
    		if(res === null)
    		{
    			return cb({'error':'unkown issue with update'}, null);
    		}
    		else
    		{
    			return cb(res, null);
    		}
    	}
   	});
};

AmazingGit.prototype.getEmailByName = function(name, cb)
{
	console.log('getEmailByName('+name+', callback)');
	_gitlab.projects.repository.showFile(
  	{
	    projectId: _projectId,
	    file_path: 'emails/'+name,
	    ref : 'master'
  	}, function(res) 
  	{
    	console.log('=== File ===');
    	//console.log(res);
    	if(res !== null && res.file_name !== null)
    	{
    		return cb(null, res);
    	}
    	else
    	{
    		return cb(res, null);
    	}
   	});
};


AmazingGit.prototype.getEmails = function(id, cb)
{
	var _res;
   //TODO

    _res = [{
		    "id": "ed899a2f4b50b4370feeea94676502b42383c746",
		    "short_id": "ed899a2f4b5",
		    "title": "Replace sanitize with escape once",
		    "author_name": "Dmitriy Zaporozhets",
		    "author_email": "dzaporozhets@sphereconsultinginc.com",
		    "created_at": "2012-09-20T11:50:22+03:00",
		    "message": "Replace sanitize with escape once"
		  },
		  {
		    "id": "6104942438c14ec7bd21c6cd5bd995272b3faff6",
		    "short_id": "6104942438c",
		    "title": "Sanitize for network graph",
		    "author_name": "randx",
		    "author_email": "dmitriy.zaporozhets@gmail.com",
		    "created_at": "2012-09-20T09:06:12+03:00",
		    "message": "Sanitize for network graph"
		  },{
		    "id": "6104942438c14ec7bd21c6cd5bd995272b3faff6",
		    "short_id": "6104942438c",
		    "title": "Email created by Simon.Diel",
		    "author_name": "randx",
		    "author_email": "dmitriy.zaporozhets@gmail.com",
		    "created_at": "2012-09-20T09:06:12+03:00",
		    "message": "Email created by Simon.Diel"
		  }];
	return cb(null, _res);
};

AmazingGit.prototype.getEmailHistory = function(id, cb)
{
	var _res;
   //TODO

    _res = [{
		    "id": "ed899a2f4b50b4370feeea94676502b42383c746",
		    "short_id": "ed899a2f4b5",
		    "title": "Replace sanitize with escape once",
		    "author_name": "Dmitriy Zaporozhets",
		    "author_email": "dzaporozhets@sphereconsultinginc.com",
		    "created_at": "2012-09-20T11:50:22+03:00",
		    "message": "Replace sanitize with escape once"
		  },
		  {
		    "id": "6104942438c14ec7bd21c6cd5bd995272b3faff6",
		    "short_id": "6104942438c",
		    "title": "Sanitize for network graph",
		    "author_name": "randx",
		    "author_email": "dmitriy.zaporozhets@gmail.com",
		    "created_at": "2012-09-20T09:06:12+03:00",
		    "message": "Sanitize for network graph"
		  },{
		    "id": "6104942438c14ec7bd21c6cd5bd995272b3faff6",
		    "short_id": "6104942438c",
		    "title": "Email created by Simon.Diel",
		    "author_name": "randx",
		    "author_email": "dmitriy.zaporozhets@gmail.com",
		    "created_at": "2012-09-20T09:06:12+03:00",
		    "message": "Email created by Simon.Diel"
		  }];
	return cb(null, _res);
};



module.exports = function() 
{
    return new AmazingGit();
} 
