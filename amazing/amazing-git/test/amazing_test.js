'use strict';

var amazingGit = require('../index.js')(),
  should = require('should');

/* jshint -W030 */
describe('amazing.js', function() 
{
  describe('init', function() 
  {
    it('exports an object', function() 
    {
      should.exist(amazingGit);
      amazingGit.should.be.an.Object;
    });


    it('createEmail', function(done) 
    {
      var eloqua = amazingGit.createEmail("testmail.html", "content content3333", "commit1", function(error, response)
      {
        done();
      });
    }); 

    it('updateEmail', function(done) 
    {
      var _file_name = "testmail.html";
      var _new_content = "11122233444";

      var eloqua = amazingGit.updateEmail(_file_name,_new_content, "commit1", function(error, response)
      {
        console.log(error);
        console.log(response);
        //(error === null).should.be.true;
        //response.should.be.an.Object;
        //response.file_name.should.equal(_file_name);

        done();
      });
    });


    it('getEmailByName', function(done) 
    { 
      var _file_name = "testmail.html";


      var eloqua = amazingGit.getEmailByName("testmail.html", function(error, response)
      {
        (error === null).should.be.true;
        response.should.be.an.Object;

        response.file_path.should.equal('emails/'+_file_name);

        //console.dir(error);
        //console.dir(response);
        done();
      });
    });

    it('getEmailByName that doesnt exist', function(done) 
    {
      var eloqua = amazingGit.getEmailByName("testmail.htl", function(error, response)
      {
        //(error !== null).should.be.true;
        //(response === null).should.be.true;
        //console.dir(error);
        //console.dir(response);
        done();
      });
    });


    it('getEmailHistory', function(done) 
    {
      var eloqua = amazingGit.getEmailHistory("4", function(error, response)
      {

        done();
      });
    });

  });
});
