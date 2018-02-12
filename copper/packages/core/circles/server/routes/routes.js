'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Circles, app, auth, database) {

  var circles = Circles.controller;

  app.use(circles.loadCircles);
	app.use(circles.userAcl);
	app.use('/api/circles/company/:company/*', circles.companyAcl);
	app.use(circles.aclBlocker);


  app.get('/api/test', circles.test);
  app.get('/api/circles/visualize', circles.visualize);
  app.get('/api/circles/tree', circles.tree);
  app.get('/api/circles/mine', circles.mine);
  app.get('/api/circles/all', circles.hasCircle('admin'), circles.all);

    app.get('/api/circles/company/:company/all', auth.requiresCompanyAdmin, circles.allFromCompany);
    app.get('/api/circles/company/:company/mine', circles.mineFromCompany);

  app.route('/api/circles/:name')
      .post(auth.requiresCompanyAdmin, circles.create)
      .put(auth.requiresCompanyAdmin, circles.update)
      .get(circles.show);
};
