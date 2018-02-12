'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Eloquaservices, app, auth, database) {

    app.get('/eloquaservices/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/eloquaservices/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/eloquaservices/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/eloquaservices/example/render', function(req, res, next) {
        Eloquaservices.render('index', {
            package: 'eloquaservices'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};
