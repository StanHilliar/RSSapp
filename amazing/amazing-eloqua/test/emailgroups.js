'use strict';

var amazingEloqua = require('../lib/amazing_eloqua_login.js')(),
should = require('should');

var companyName = 'TechnologyPartnerLeadMgtTechSolutionsAB';
var username ='Simon.Diel';
var password = 'kGb01kvyqV3cKkQn';
var host = 'https://secure.p02.eloqua.com';


/* jshint -W030 */
describe('emailgroups.js', function() 
{
  describe('emailgroups', function() 
  {
    var eloqua;
    before(function() 
    {
      eloqua = amazingEloqua.login(companyName, username, password, host);  // Important choose the right base url
    })

    it('searchGroups', function(done) 
    {
      eloqua.searchEmailGroups('*', '1', '300', 'minimal', function(err, res)
      {
        /*
        console.log('err');
        console.log(err);
        console.log(err.msg[0]);
        console.log('res');
        */
        console.log(res);
        //console.log(res.metadata);
        //console.log(res.elements[0].elements[0]);
       
        (err === null).should.be.true;
        (res === null).should.be.false;
        res.elements.should.be.an.instanceOf(Array);
        done();
      });
    });

   
 
  });

});
