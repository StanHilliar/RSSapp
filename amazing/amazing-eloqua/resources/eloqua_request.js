'use strict';

//var b64 = require('b64');
var request = require('request');
// var request = require('requestretry');

function EloquaRequest(accessToken, baseUrl) 
{
	this.baseUrl = baseUrl || 'https://secure.eloqua.com';
	this.credential = accessToken;
}

/*
function EloquaRequest(site, user, password, baseUrl) 
{
	this.baseUrl = baseUrl || 'https://secure.eloqua.com';
	this.credential = b64.encode(site + '\\' + user + ':' + password);
}*/


EloquaRequest.prototype.request = function(url, options, callback) 
{
	var _this = this;
	var requestOptions = 
	{ 
		url: _this.baseUrl + url, 
		headers: { Authorization: _this.credential }, 
		json: true,       
		timeout: 120000,		// The below parameters are specific to request-retry
		//maxAttempts: 5,   // (default) try 5 times
		//retryDelay: 5000,  // (default) wait for 5s before trying again
		//retryStrategy: request.RetryStrategies.HTTPOrNetworkError // (d
	};
  	for (var key in options) 
  	{
    	var val = options[key];
    	requestOptions[key] = val;
	}

	return request(requestOptions, function(err, response, body) 
  	{
		if (err !== null) 
		{
			return callback(err, null);
		}
		
		if (response.statusCode !== 200 && response.statusCode !== 201) 
		{
			return callback({ code: response.statusCode, msg: body }, null);
		}
    	return callback(null, body);
  	});
};

EloquaRequest.prototype.get = function(uri, callback) 
{
	this.request(uri, null, callback);
};

EloquaRequest.prototype.put = function(uri, data, callback) 
{
	this.request(uri, { method: 'PUT', body: data }, callback);
};

EloquaRequest.prototype.post = function(uri, data, callback) 
{
	this.request(uri, { method : 'POST', body: data }, callback);
};

EloquaRequest.prototype.remove = function(uri, callback) 
{
	this.request(uri, { method: 'DELETE' }, callback);
};

module.exports = function(accessToken, baseUrl) 
{
	return new EloquaRequest(accessToken, baseUrl);
}