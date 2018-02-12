'use strict';

// The Package is past automatically as first parameter
module.exports = function(EloquaServices, app, auth, database) 
{

    app.get('/api/eloquaservices/search/anyone', function(req, res, next) 
    {
        res.send('Anyone can access this');
    });

    var Search = require('../controllers/eloqua/search.js');
    Search.init(app, 'search');

};
