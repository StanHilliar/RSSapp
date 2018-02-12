'use strict';

/**
 * Module dependencies.
 */
  var EloquaHelper    = require('../controllers/eloqua/EloquaHelper.js').EloquaHelper;


exports.getAllLandingPages = function(req, res, next, cb)
{
  console.log('/contacts/search?');

  console.log('search: '+req.query.search);
  console.log('page: '+req.query.page);
  console.log('count: '+req.query.count);
  console.log('depth: '+req.query.depth);
  console.log('company: '+req.params.company);
  console.log('username: '+req.params.username);

  var _search = req.query.search;
  var _page = req.query.page;
  var _count = req.query.count;
  var _depth = req.query.depth;


  if(_page === '')
  {
      _page = '1';
  }


  if(_count === '')
  {
      _count = '10';
  }

  if(_depth === '')
  {
      _depth = 'minimal';
  }

  EloquaHelper.getBasicLoginByCompanyAndUsername(req.user._id, req.params.company, req.params.username, function (err, user)
  {
    var myeloqua = EloquaHelper.getBasicLoginUP(user.company, user.username, user.password, user.base_url);
    EloquaHelper.landingpages_search(myeloqua, _search, _page, _count, _depth,
        function(err, response)
        {
            res.send(response);
        });

  });
};
