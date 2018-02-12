'use strict';

var amazingEloqua = require('../lib/amazing_eloqua_login.js')(),
  should = require('should');

/* jshint -W030 */
describe('landingPageTest.js', function() 
{

    
    var eloqua;
    before(function() 
    {
      eloqua = amazingEloqua.login('TechnologyPartnerLeadMgtTechSolutionsAB', 'Simon.Diel', 'kGb01kvyqV3cKkQn', 'https://www02.secure.eloqua.com');  // Important choose the right base url
    });

    describe('searchLandingpages', function() 
    {
      it('searchLandingpages', function(done) 
      {
        eloqua.searchLandingpages('*', '1', '100', 'minimal', function(err, res)
        {
          //console.log(err);
          //console.log(res);
          (res.elements  === null).should.be.false;
          res.page.should.eql(1);
          res.pageSize.should.eql(100);
          (err === null).should.be.true;
          done();
        });
      }); 
    });

    describe('getLandingpageById', function() 
    {
      it('id == 1', function(done) 
      {
        eloqua.getLandingpageById('1', 'complete', function(err, res)
        {
          console.log(err);
          //console.log(res);
          res.type.should.eql('LandingPage');
          res.id.should.eql('1');
          res.createdAt.should.not.be.empty;
          (err === null).should.be.true;
          done();
        });
      }); 

      it('with empty Id', function(done) 
      {
        eloqua.getLandingpageById('', 'complete', function(err, res)
        {
          //console.log(err);
          //console.log(res);
          err.code.should.eql(404);
          
          (res === null).should.be.true;
          done();
        });
      }); 

      it('with noexistent Id', function(done) 
      {
        eloqua.getLandingpageById('885445224545643578', 'complete', function(err, res)
        {
          console.log(err);
          //console.log(res);
          err.code.should.eql(500);
          
          (res === null).should.be.true;
          done();
        });
      }); 
    });
  





});
