'use strict';

var amazingEloqua = require('../lib/amazing_eloqua_login.js');
var aEloqua = amazingEloqua();


var eloqua = aEloqua.login('TechnologyPartnerLeadMgtTechSolutionsAB', 'Simon.Diel', '55708Q1ecci8rEAq','https://secure.p02.eloqua.com');
// var eloqua = aEloqua.login('BonnierBusinessMediaTest', 'Eloqua.Api', 'Y1BqtOeH9gRvy1awPGCm1rA3','https://secure.p06.eloqua.com');

/*
var dictonary = 
{
  "name": "Example Custom Object Import",
  "fields": 
  {
    "OrderOrderrowId": "{{CustomObject[7].Field[198]}}"
  },
  "identifierFieldName": "OrderOrderrowId"
};

var data = [
  {OrderOrderrowId: '1' },
  {OrderOrderrowId: '2' }
  ];
*/
/*
eloqua.bulkCreateCDORecords('7', dictonary, data, function(err, res)
{
  console.log('cb');
});*/

// eloqua.getContactSubscriptionsById('12', function(err,res)
// {
//   console.log('cb');
//   console.log(err);
//   console.log(res);
//   if(res && res.elements)
//   {
//     for(var i = 0; i < res.elements.length; i++)
//     {
//       console.log(res.elements[i].emailGroup);
//     }
//   }
//   console.log('length '+res.elements.length);

// });

var data = {};
data.contactId = '12';
data.emailGroup = {};
data.emailGroup.id = '3';
data.emailGroup.depth = 'minimal';
data.emailGroup.name = 'Events';
data.isSubscribed = 'true';


  eloqua.updateContactGroupSubscription('12', '3', data, function(err,res)
  {
    console.log('cb');
    console.dir(err);
    console.log(res);
    // if(res && res.elements)
    // {
    //   for(var i = 0; i < res.elements.length; i++)
    //   {
    //     console.log(res.elements[i].emailGroup);
    //   }
    // }
    // console.log('length '+res.elements.length);

  });


/*
eloqua.getEmailById('153', 'complete', function(err, res)
{
  console.log('callback');
  console.log(err);
  console.log(res);
  console.log('end')
});*/
/*
eloqua.get_id(function(err, res)
{
  console.log('callback');
  console.log(err);
  console.log(res);
  console.log('end')
});

*/

/*

var Eloqua  = require('../resources/eloqua_request');

var _eloqua = null;


_eloqua = new Eloqua('123', '134r32');

console.log(_eloqua);

_eloqua.get('/id', function(err, response)
{
   console.log('callback ->');
   console.log(err);
   console.log(response);

});


console.log('end');


*/



/*
var amazingEloqua  = require('../lib/amazing_eloqua');


//var _loginstr ='LeadManagementTeqSolutionsAB'+'\\'+'Simon.Diel'+':'+'TtF5l6EtTc4Gl9nucNpbWLjX';
var _loginstr ='TechnologyPartnerLeadMgtTechSolutionsAB'+'\\'+'Simon.Diel'+':'+'9DZSUDGureim9o9R';

var _host = 'https://login.eloqua.com';


console.log('loginstr '+_loginstr);

var _eloqua = null;
_eloqua = new amazingEloqua('Basic '+(new Buffer(_loginstr).toString('base64')), _host);


_eloqua.get_id(function(err, res)
{
  console.log('callback');
  console.log(err);
  console.log(res);
  console.log('end')
});
console.log(_eloqua.getElq());
console.log('............');
*/




