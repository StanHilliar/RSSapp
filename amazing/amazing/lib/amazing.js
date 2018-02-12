'use strict';

var mongoose = require('mongoose');


var ee_model = require('../models/eloquaEmail');
var eU_model = require('../models/eloquaUser');
var eloquaEmail = mongoose.model('EloquaEmail');
var eloquaUser = mongoose.model('eloquaUser');

var amazingEloqua = require('amazing-eloqua')();
var amazingGit = require('amazing-git')();
var _config;
var async = require('async');


function Amazing() 
{
	console.log('Amazing');
}

Amazing.prototype.init = function(config) 
{
	_config = config;
	mongoose.connect(_config.db); 
}


Amazing.prototype.login = function(company, username, password, host)
{
  
};

Amazing.prototype.getIDbyToken = function(accessToken, cb)
{
 	var _eloqua = amazingEloqua.loginwithToken(accessToken);
 	return _eloqua.getId(cb);		
};


Amazing.prototype.getCompany = function(company, username)
{

	//console.log('--getCompany--');
	//console.log(company);
	//console.log(username);

	function _initEloqua(_company, _username, cb)
	{
		console.log('_initEloqua('+_company+','+ _username+', cb)');
		if(_company != null && _company != '' && _username != null && _username != '')
		{
			_getEloquaLoginCredentials(_company, _username, function(error, credentials)
			{
				var eloqua = null;
				if(credentials != null)
				{
					if(credentials.type == "basic")
					{
						eloqua = amazingEloqua.login(_company, _username, credentials.password, credentials.host);
					}
					else
					{
						if(credentials.type == "oauth")
						{
							eloqua = amazingEloqua.loginwithToken(credentials.accessToken, credentials.host);
						}
					}	
				}
				return cb(null, eloqua);
			});
		}
		else
		{
			return cb('error params empty', null);
		}
	}	

	function _fetchEmailfromEloquaAndUpdateinDatabase(id, retry, cb)
	{
		var that = this;
		console.log('fetchEmailfromEloquaAndUpdateinDatabase('+id+','+retry+')');
		if(retry)
		{
			_initEloqua(company, username, function(error, _eloqua)
			{
				if(error == null)
				{
					_eloqua.getEmailById(id, 'complete', function(e_error, response)
					{
						console.log('getEmailById callback');
						console.error(error);
						console.log(response);
						console.log(response.id);

						if(e_error == null)
						{
							var _html = '';
							if(response != null && response.htmlContent != null && response.htmlContent.html != null)
							{
								console.log('--11--');
								_html = response.htmlContent.html;
							}
							else
							{
								if(response != null && response.htmlContent != null && response.htmlContent.htmlBody != null)
								{
									console.log('--22--');
									_html = response.htmlContent.htmlBody;
								}
							}

							amazingGit.createEmail(id+'.html', _html+'456', 'updated by '+username, function(update_error, update_response)
							{	
								//return cb(update_error,update_response);
								console.log('updateEmail callback');

								that.createOrUpdateEmailInMongoDB(company, response, function( cou_error, cou_response)
								{
									return cb(cou_error, cou_response);
								});
								
							});
									
						}
						else
						{
							if(e_error.code == '401')
							{
								_refreshAccessTokenEloqua(company, username, function(r_error, r_response)
								{	
									_updateTokens(company, username, r_response, function(update_error, update_response)
									{
										if(update_error == null)
										{
											return _fetchEmailfromEloquaAndUpdateinDatabase(id, false, cb);
											//return cb('awesome',null);
										}
										else
										{
											return cb(update_error, update_response);
										}
									});
								});
							}
							else
							{
								return cb(e_error, null);
							}
						}
					}); 
				}
				else
				{
					return cb(error,null);
				}
			});
		}
		else
		{
			return cb({'error': 'no retry'},null);
		}
	}

	function _refreshAccessTokenEloqua(_company, _username, cb)
	{
		console.log('_refreshAccessTokenEloqua('+_company+','+ _username+', cb)');
		if(_company != null && _company != '' && _username != null && _username != '')
		{
			_getEloquaLoginCredentials(_company, _username, function(error, credentials)
			{
				console.log('_refreshAccessTokenEloqua callback');
				var eloqua = amazingEloqua.loginwithIdandSecret(_config.eloqua.clientID, _config.eloqua.clientSecret);
				eloqua.refreshAccessToken(credentials.refreshToken, function(refresh_error, refresh_response)
				{
					if(refresh_error)
			        {
			            console.dir(refresh_error);
			            console.dir(refresh_error.msg.failures);
			            console.log('eq err:'+refresh_error);
			        }
			        if(refresh_response)
			        {
			            //console.log('eq response: %j', refresh_response);
			            //console.log(refresh_response.access_token);

			            return cb(null, refresh_response);
			        }
			        else
			        {
			            return cb({'error': refresh_error}, {});
			        }
				});
			});
		}
		else
		{
			return cb('error params empty', null);
		}
	}

	function _getEloquaLoginCredentials(_company, _username, cb)
	{
		console.log('_getEloquaLoginCredentials('+_company+','+ _username+', cb)');
		eloquaUser.findOne({'username' : _username}).exec(function(error, basicUser)
	    {
	        console.log('_getEloquaLoginCredentials inner callback');
	        //console.log(error);
	        //console.log(basicUser);
	        //cb(error, {'users': basicUsers});
	        if(error == null)
	        {
		        return cb(null, 
		        { 
					type: 'oauth',
					accessToken: basicUser.accessToken,
					refreshToken: basicUser.refreshToken,
					host: basicUser.base_url
				});
	    	}
	    	else
	    	{
	    		return cb(error, null);
	    	}
	    });

/*
		//TODO make dynamic
		return ;*/
	}

	function _updateTokens(_company, _username, data, cb)
	{
		console.log('_updateTokens('+_company+','+ _username+', cb)');
		eloquaUser.findOne({ 'company' : _company}).exec(function(error, basicUser)
	    {
	        console.log('_updateTokens inner callback');
	        console.log(error);
	        console.log(basicUser);
	        //cb(error, {'users': basicUsers});
	        if(error == null)
	        {
	        	basicUser.accessToken = data.access_token;
	        	basicUser.refreshToken = data.refresh_token;
	        	//data.expires_in;  //TODO save in DB
	 			basicUser.save(function(save_error)
	 			{
	 				console.log('_updateTokens save callback');
	 				console.log(save_error);

	 				if(save_error == null)
	 				{
	 					return cb(null, true);
	 				}
	 				else
	 				{
	 					return cb(save_error, null);
	 				}
	 			});

	    	}
	    	else
	    	{
	    		return cb(error, null);
	    	}
	    });

/*
		//TODO make dynamic
		return ;*/
	}


	if(company != null && company != '' && username != null && username != '')
	{
		this.initOrUpdateAllEmailsInDatabaseAndMongoDB = function(search, page, count, depth, cb)
		{
			var that = this;
			_initEloqua(company, username, function(error, _eloqua)
			{
				if(error == null)
				{
					_eloqua.searchEmails(search, page, count, 'minimal', function(getEmails_error, getEmails_response)
						{
							console.log('searchEmails callback');
							var q = async.queue(function (task, callback) 
							{
							    console.log('hello ' + task.id);
							    that.fetchEmailfromEloquaAndUpdateinDatabase(task.id, true, function(a,b)
							    {
							    	console.log('^^^22233');

							    	callback();
							    });
							}, 2);


							// assign a callback
							q.drain = function() 
							{
							    console.log('all items have been processed');
							    return cb();
							}

							if(getEmails_error == null && getEmails_response != null && getEmails_response.elements != null)
							{
								console.log('no errors');
			
								for(var i = 0; i < getEmails_response.elements.length; i++)
								{	
									console.log('push'+getEmails_response.elements[i].id);
									q.push({'id':getEmails_response.elements[i].id}, function (err) 
									{
									    console.log('finished processing bar');
									});
								}
							}
							else
							{
								//ERROR
								console.err(getEmails_error);
								console.err(getEmails_response);
								return cb(getEmails_error,getEmails_response);
							}
						}); 


				}
				else
				{
					return cb(error,null);
				}
			});
		};

		this.getEmails = function(search, page, count, depth, cb)
		{
			_initEloqua(company, username, function(error, _eloqua)
			{
		
				if(error == null)
				{
					return _eloqua.searchEmails(search, page, count, depth, cb); 
				}
				else
				{
					return cb(error,null);
				}
			});
		};


		this.fetchEmailfromEloquaAndCreateinDatabase = function(id, cb)
		{
			_initEloqua(company, username, function(error, _eloqua)
			{
		
				if(error == null)
				{
					_eloqua.getEmailById(id, 'complete', function(error, response)
					{
						amazingGit.updateEmail(id+'.html', response.htmlContent.html, 'updated by '+username, cb);
					}); 
				}
				else
				{
					return cb(error,null);
				}
			});
		};


		this.fetchEmailfromEloquaAndUpdateinDatabase = _fetchEmailfromEloquaAndUpdateinDatabase;

		this.fetchEmailfromEloquaAndUpdateinDatabase2 = function(id, retry, cb)
		{
			
			var that = this;

			console.log('fetchEmailfromEloquaAndUpdateinDatabase('+id+','+retry+')');
			_initEloqua(company, username, function(error, _eloqua)
			{
				if(error == null)
				{
					_eloqua.getEmailById(id, 'complete', function(e_error, response)
					{
						console.log('getEmailById callback');
						console.error(error);
						console.log(response);

						if(e_error == null)
						{
							var _html = '';
							if(response != null && response.htmlContent != null && response.htmlContent.html != null)
							{
								console.log('--1--');
								_html = response.htmlContent.html;
							}
							else
							{
								if(response != null && response.htmlContent != null && response.htmlContent.htmlBody != null)
								{
									console.log('--2--');
									_html = response.htmlContent.htmlBody;
								}
							}

							amazingGit.updateEmail(id+'.html', _html, 'updated by '+username, cb);
						}
						else
						{
							if(e_error.code == '401')
							{
								_refreshAccessTokenEloqua(company, username, function(r_error, r_response)
								{	
									_updateTokens(company, username, r_response, function(update_error, update_response)
									{
										if(update_error == null)
										{
											return Amazing.getCompany(company, username).fetchEmailfromEloquaAndUpdateinDatabase(id, false, cb);
											//return cb('awesome',null);
										}
										else
										{
											return cb(update_error, update_response);
										}
									});
								});
							}
							else
							{
								return cb(e_error, null);
							}
						}
					}); 
				}
				else
				{
					return cb(error,null);
				}
			});
		}

		this.getEmailfromDatabase = function(id, cb)
		{
			_initEloqua(company, username, function(error, _eloqua)
			{
		
				if(error == null)
				{
					_eloqua.getEmailById(id, 'complete', cb); 
				}
				else
				{
					return cb(error,null);
				}
			});
		}		

		this.createOrUpdateEmailInMongoDB = function(company, email, cb)
		{
			console.log('createOrUpdateEmailInMongoDB('+company+','+email.id+')');
			eloquaEmail.findOne(
		    {
		    	companyandid: company+"//"+email.id
		    }, function(err, e_emails)
		    {
		        console.log('createOrUpdateEmailInMongoDB inner callback');
		       // console.log(err);
		       // console.log(e_emails);

		        if(e_emails == null)
		        {
		        	var new_email = new eloquaEmail(
	                {
	                    companyandid  : company+'//'+email.id,
	                    id  : +email.id,
	                  	type : email.type,
	                  	currentStatus : email.currentStatus,
	                  	createdAt : email.createdAt,
	                  	createdBy : email.createdBy,
	                  	depth : email.depth,
	                  	folderId : email.folderId,
	                  	name : email.name,
	                  	permissions : email.permissions,
	                  	updatedAt : email.updatedAt,
	                  	updatedBy : email.updatedBy,
	                  	bounceBackEmail : email.bounceBackEmail,
	                  	emailGroup : email.emailGroup,
	                  	isPlainTextEditable : email.isPlainTextEditable,
	                  	isTracked : email.isTracked,
	                  	replyToEmail : email.replyToEmail,
	                  	replyToName : email.replyToName,
	                  	sendPlainTextOnly : email.sendPlainTextOnly,
	                  	senderEmail : email.senderEmail,
	                  	senderName : email.senderName,
	                  	style : email.style,
	                  	subject : email.subject
	                });
	                new_email.save(function(err)
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
		        	//TODO - UPDATE EMAIL
		        	return cb({}, {'success': true});
		        }


		       
		    });   
		}


		this.getEmailHistory = function(id, cb)
		{
			return amazingGit.getEmailHistory(id, cb); 
		};

		this.getEmailByName = function(name, cb)
		{
			return amazingGit.getEmailByName(name, cb); 
		};
	
		return this;
	}
	else
	{
		return null;
	}
};


Amazing.prototype.helloworld = function(cb)
{
   console.log('hello world');
   cb();
};

Amazing.prototype.getEmailHistory = function(id, cb)
{
    return amazingGit.getEmailHistory(id, cb);
};



module.exports = function(config) 
{
    return new Amazing(config);
} 
