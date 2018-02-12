'use strict';

var amazingEloqua = require('../lib/amazing_eloqua_login.js')(),
  should = require('should');

/* jshint -W030 */
describe('landingPageTest.js', function() 
{

    
    var eloqua;
    before(function() 
    {
      eloqua = amazingEloqua.login('TechnologyPartnerLeadMgtTechSolutionsAB', 'Simon.Diel', '848Sm4kXlVP8z40o', 'https://www02.secure.eloqua.com');  // Important choose the right base url
    });

    describe('getContactSubscriptionsById', function() 
    {
      it('getContactSubscriptionsById', function(done) 
      {
        eloqua.getContactSubscriptionsById('1', function(err, res)
        {
          console.log(err);
          console.log(res);

          (res.elements  === null).should.be.false;
          res.page.should.eql(1);
          res.pageSize.should.eql(1000);
          (err === null).should.be.true;
          for(var i = 0; i < res.elements.length; i++)
          {
            console.log(res.elements[i].emailGroup);
          }
          done();
        });
      });    

    });

});
