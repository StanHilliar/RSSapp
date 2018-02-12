'use strict';

var amazingEloqua = require('../lib/amazing.js')(),
  should = require('should');
  amazingEloqua.init({db: 'mongodb://' + (process.env.DB_PORT_27017_TCP_ADDR || 'localhost') + '/mean-dev'});

/* jshint -W030 */
describe('amazing.js', function() 
{
  describe('init', function() 
  {
    it('exports an object', function() 
    {
      should.exist(amazingEloqua);
      amazingEloqua.should.be.an.Object;
    });

    it('getCompany without credentials', function() 
    {
      var comp = amazingEloqua.getCompany('', '');
      should.not.exist(comp);
    });

    it('getCompany without credentials 2', function() 
    {
      var comp = amazingEloqua.getCompany();
      should.not.exist(comp);
    });


    it.skip('getCompany with wrong credentials', function() 
    {
      var comp = amazingEloqua.getCompany('test', 'test');
      should.not.exist(comp);
    });

    it('getCompany with correct credentials', function() 
    {
      var comp = amazingEloqua.getCompany('TechnologyPartnerLeadMgtTechSolutionsAB', 'Simon.Diel');
      should.exist(comp);
    });

    it.skip('getEmails', function(done) 
    {
      var comp = amazingEloqua.getCompany('TechnologyPartnerLeadMgtTechSolutionsAB', 'Simon.Diel');
      comp.getEmails("*", "1", "10", "complete", function(error, response)
      {
        should.not.exist(error);
        //console.log(response);
        response.should.be.json;
        response.page.should.be.exactly(1);
        response.pageSize.should.be.exactly(10);
        response.total.should.be.below(11);
        done();
      });

    });

    it('getEmailHistory', function(done) 
    {
      var comp = amazingEloqua.getCompany('TechnologyPartnerLeadMgtTechSolutionsAB', 'Simon.Diel');
      comp.getEmailHistory("25", function(error, response)
      {
        should.not.exist(error);
        //console.log(response);
        response.should.be.json;
        done();
      });

    });

    it.skip('getEmailsformMongoDB', function(done) 
    {
      var comp = amazingEloqua.getCompany('TechnologyPartnerLeadMgtTechSolutionsAB', 'Simon.Diel');
      comp.getEmailsformMongoDB(function(error, response)
      {
        should.not.exist(error);
        //console.log(response);
        response.should.be.json;
        done();
      });

    });    


    it.skip('fetchEmailfromEloquaAndUpdateinDatabase', function(done) 
    {
      var comp = amazingEloqua.getCompany('TechnologyPartnerLeadMgtTechSolutionsAB', 'Simon.Diel');
      comp.fetchEmailfromEloquaAndUpdateinDatabase('59', true, function(error, response)
      {
        console.log(error);
        console.log(response);
        should.not.exist(error);
        //console.log(response);
        response.should.be.json;
        done();
      });
    });

    it('initOrUpdateAllEmailsInDatabaseAndMongoDB', function(done) 
    {
      var comp = amazingEloqua.getCompany('TechnologyPartnerLeadMgtTechSolutionsAB', 'Simon.Diel');
      comp.initOrUpdateAllEmailsInDatabaseAndMongoDB('*', 1, 100, 'COMPLETE', function(error, response)
      {
        console.log(error);
        console.log(response);
        should.not.exist(error);
        //console.log(response);
        done();
      });
    });
  });

});
