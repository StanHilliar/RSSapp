'use strict';

module.exports = function(MeanUser, app, auth, database, passport) 
{

	var Feeder = require('../controllers/eloqua/feeder.js');
	Feeder.init(app, 'feeder');

	app.route('/api/feedertest')
    .get(function(req, res) 
    {
      res.send('yolo');
    });

    app.route('/api/ohmygoditsdata')
    .get(function(req, res) 
    {
      res.send(['yolo','wow']);
    });
 	
// 	var SearchFeeder = new Feeder(app, 'feeder');

};