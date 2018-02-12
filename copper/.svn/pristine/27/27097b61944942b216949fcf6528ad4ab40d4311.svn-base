'use strict';

/**
 * Module dependencies.
 */
  var EloquaHelper    = require('../../../eloquaservices/server/controllers/eloqua/EloquaHelper.js').EloquaHelper;

/*
  var gitlab = require('gitlab')({
  url:   'https://gitlab.com',
  token: 'Y3PkteH1E2h6QsuHbYJA'
});*/

/*
function print_projects(project) 
{
  console.log('=== Project ===');
  return console.log(project);
}*/

exports.getAllEmailsfromEloqua = function(req, res, next, cb)
{
  console.log('/getAllEmailsfromEloqua');

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

  if(req.params.company !== null && req.params.username !== null)
  {
  EloquaHelper.getBasicLoginByCompanyAndUsername(req.user._id, req.params.company, req.params.username, function (err, user)
  {
    if(user !== null && user.company !== null)
    {


    var myeloqua = EloquaHelper.getBasicLoginUP(user.company, user.username, user.password, user.base_url);
    EloquaHelper.emails_search(myeloqua, _search, _page, _count, _depth,
    function(err2, response)
    {
      if(!err2)
      {
        EloquaHelper.updateEmailsInMongoDB(response,
        function(err3, response3)
        {
          cb(err3, response3);
        });
      }
      else
      {
        console.error(err2);
        cb(err2, null);
      }
    });
    }
    else
    {
      cb({'error':'company not found'}, null);
    }
  });
  }
  else
  {
     cb({'error':'company is null'}, null);
  }
};

exports.getAllEmails = function(req, res, next, cb)
{
  console.log('/getAllEmails');

  console.log('search: '+req.query.search);
  console.log('page: '+req.query.page);
  console.log('count: '+req.query.count);
  console.log('depth: '+req.query.depth);
  console.log('company: '+req.params.company);
  console.log('username: '+req.params.username);

  //var _search = req.query.search;
  var _page = req.query.page;
  var _count = req.query.count;
  var _depth = req.query.depth;

  // Listing projects
  /*gitlab.projects.all(function(projects) 
  {
    console.log('gitlab::::');
    for (var i = 0; i < projects.length; i = i +1) 
    {
      console.log('#' + projects[i].id + ': ' + projects[i].name + ', path: ' + projects[i].path + ', default_branch: ' + projects[i].default_branch + ', private: ' + projects[i]['private'] + ', owner: ' + projects[i].owner.name + ' (' + projects[i].owner.email + '), date: ' + projects[i].created_at);
       gitlab.projects.show( projects[i].id, print_projects);       
    }
  });  */
  
/*
  var projectId = 257630;

  gitlab.projects.repository.listTree(projectId,
  {
    ref: 'master',
    path: 'emails'
  }, function(data) 
  {
    console.log('=== listTree ===');
    console.log(data);

    cb(null, {'elements': data});
  });*/
   
   /*
   gitlab.projects.repository.createFile(
  {
    projectId: projectId,
    file_path: 'emails/email1.html',
    branch_name : 'master',
    content: 'ABCI123',
    commit_message: 'test commit ABCI123'

  }, function(file) 
  {
    console.log('=== File ===');
    console.log(file);
  });*/
/*

  gitlab.projects.repository.showFile(
  {
    projectId: projectId,
    ref: 'master',
    file_path: 'README.md'
  }, function(file) 
  {
    console.log('=== READFile ===');
    console.log(file);
    if (file) 
    {
      console.log('=== Content ===');
      return console.log((new Buffer(file.content, 'base64')).toString());
    }
  });*/

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

 // EloquaHelper.getBasicLoginByCompanyAndUsername(req.user._id, req.params.company, req.params.username, function (err, user)
  //{
  //  var myeloqua = EloquaHelper.getBasicLoginUP(user.company, user.username, user.password, user.base_url);
    EloquaHelper.getAllEmailsfromMongoDB(
        function(err2, response)
        {
            //res.send(response);
            cb(err2, response);
        });

  //});
};


exports.getEmailHistory = function(req, res, next, cb)
{
  console.log('/getAllEmails');

  console.log('id: '+req.query.id);
  console.log('page: '+req.query.page);
  console.log('count: '+req.query.count);

  console.log('company: '+req.params.company);
  console.log('username: '+req.params.username);

  //var _search = req.query.search;
  var _page = req.query.page;
  var _count = req.query.count;


  if(_page === '')
  {
      _page = '1';
  }

  if(_count === '')
  {
      _count = '10';
  }

  // Listing projects
  /*gitlab.projects.all(function(projects) 
  {
    console.log('gitlab::::');
    for (var i = 0; i < projects.length; i = i +1) 
    {
      console.log('#' + projects[i].id + ': ' + projects[i].name + ', path: ' + projects[i].path + ', default_branch: ' + projects[i].default_branch + ', private: ' + projects[i]['private'] + ', owner: ' + projects[i].owner.name + ' (' + projects[i].owner.email + '), date: ' + projects[i].created_at);
       gitlab.projects.show( projects[i].id, print_projects);       
    }
  });  */
  
/*
  var projectId = 257630;

  gitlab.projects.repository.listTree(projectId,
  {
    ref: 'master',
    path: 'emails'
  }, function(data) 
  {
    console.log('=== listTree ===');
    console.log(data);

    cb(null, {'elements': data});
  });*/
   
   /*
   gitlab.projects.repository.createFile(
  {
    projectId: projectId,
    file_path: 'emails/email1.html',
    branch_name : 'master',
    content: 'ABCI123',
    commit_message: 'test commit ABCI123'

  }, function(file) 
  {
    console.log('=== File ===');
    console.log(file);
  });*/
/*

  gitlab.projects.repository.showFile(
  {
    projectId: projectId,
    ref: 'master',
    file_path: 'README.md'
  }, function(file) 
  {
    console.log('=== READFile ===');
    console.log(file);
    if (file) 
    {
      console.log('=== Content ===');
      return console.log((new Buffer(file.content, 'base64')).toString());
    }
  });*/



};



exports.getAllEmailFolders = function(req, res, next, cb)
{
  console.log('/getAllEmailFolders');

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
    EloquaHelper.emailfolders_search(myeloqua, _search, _page, _count, _depth,
        function(err2, response)
        {
            //res.send(response);
            cb(err2, response);
        });

  });
};
