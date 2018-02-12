'use strict';

var amazingEloqua  = require('./amazing_eloqua');

function AmazingEloquaLogin() 
{
    //console.log('AmazingEloquaLogin')
}



AmazingEloquaLogin.prototype.login = function(company, username, password, host)
{
    //console.log('login');

    var _loginstr =company+'\\'+username+':'+password;

    var _host = 'https://login.eloqua.com';
    if(host != null)
    {
      _host = host;
    }

    //console.log('loginstr '+_loginstr);

    var eloqua = new amazingEloqua('Basic '+(new Buffer(_loginstr).toString('base64')), _host);

    return eloqua;
};


AmazingEloquaLogin.prototype.loginwithToken = function(accessToken, host)
{
    //console.log('login');

    var _host = 'https://login.eloqua.com';
    if(host != null)
    {
      _host = host;
    }


    //console.log('loginstr '+_loginstr);
    if(accessToken != null)
    {

        var eloqua = new amazingEloqua('Bearer '+accessToken, _host);
        return eloqua;
    }
    else
    {
        console.error('loginwithToken | accessToken is null');
        return null;
    }
    //var eloqua = new amazingEloqua('Bearer '+(new Buffer(_loginstr).toString('base64')), _host);
};


AmazingEloquaLogin.prototype.loginwithIdandSecret = function(clientID, clientSecret)
{
    console.log('loginwithIdandSecret('+clientID+' ||||||| '+clientSecret+')');

    var _host = 'https://login.eloqua.com';
  
    if(clientID != null && clientSecret != null)
    {

        var eloqua = new amazingEloqua('Basic '+(new Buffer(clientID+':'+clientSecret).toString('base64')), _host);
       return eloqua;
    }
    else
    {
        console.error('loginwithIdandSecret | clientID or clientSecret is null');
        return null;
    }
    //var eloqua = new amazingEloqua('Bearer '+(new Buffer(_loginstr).toString('base64')), _host);
};


module.exports = function() 
{
    return new AmazingEloquaLogin();
} 
