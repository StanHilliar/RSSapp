'use strict';
var Grid = require('gridfs-stream');

// The Package is passed automatically as first parameter
module.exports = function(Admin, app, auth, database) {
    var gfs = new Grid(database.connection.connections[0].db, database.connection.mongo);
    var mean = require('meanio');

    //Setting up the users api
    var users = require('../controllers/users');
    app.get('/api/:company/cadmin/users', auth.requiresCompanyAdmin, users.all);
    app.post('/api/:company/cadmin/users', auth.requiresCompanyAdmin, users.create);
    app.put('/api/:company/cadmin/users/:userId', auth.requiresCompanyAdmin, users.update);
    app.delete('/api/:company/cadmin/users/:userId', auth.requiresCompanyAdmin, users.destroy);    


    //Setting up the themes api
    var themes = require('../controllers/themes');
    app.get('/api/cadmin/themes', auth.requiresCompanyAdmin, function(req, res) {
        themes.save(req, res, gfs);
    });

    app.get('/api/cadmin/themes/defaultTheme', auth.requiresCompanyAdmin, function(req, res) {
        themes.defaultTheme(req, res, gfs);
    });

    app.get('/api/cadmin/modules', auth.requiresCompanyAdmin, function(req, res) {
	    //var modules = mean.exportable_modules_list;
	    //res.jsonp(modules);
	    //for (var index in mean.resolved) {
		 //   //console.log(mean.resolved);
		 //   if (mean.resolved[index].result) console.log(mean.resolved[index].result.loadedmodule);
	    //}
    });

    var settings = require('../controllers/settings');
    app.get('/api/cadmin/settings', auth.requiresCompanyAdmin, settings.get);
    app.put('/api/cadmin/settings', auth.requiresCompanyAdmin, settings.save);

	var moduleSettings = require('../controllers/module-settings');
	app.get('/api/cadmin/moduleSettings/:name', auth.requiresCompanyAdmin, moduleSettings.get);
	app.post('/api/cadmin/moduleSettings/:name', auth.requiresCompanyAdmin, moduleSettings.save);
	app.put('/api/cadmin/moduleSettings/:name', auth.requiresCompanyAdmin, moduleSettings.update);
};
