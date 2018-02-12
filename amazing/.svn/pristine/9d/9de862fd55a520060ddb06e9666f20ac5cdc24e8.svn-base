'use strict';

var amazingEloqua = require('../lib/amazing_eloqua_login.js')(),
should = require('should');

var companyName = 'TechnologyPartnerLeadMgtTechSolutionsAB';
var username ='Simon.Diel';
var password = '55708Q1ecci8rEAq';
var host = 'https://secure.p02.eloqua.com';


/* jshint -W030 */
describe('email.js', function() 
{
  describe('email', function() 
  {
    var eloqua;

    var tEmail = 
    {
      id: null,
      name: 'TestEmail334455',
      folder: '481',
      header: '1',
      emailGroup: '1',
      footer: '1',
      subject: 'test',
      html: '<html><head></head><body>test 1122444 omg 124</body></html>'
    };

    before(function() 
    {
      eloqua = amazingEloqua.login(companyName, username, password, host);  // Important choose the right base url
    })

    it.skip('createHTMLEmail', function(done) 
    {
      eloqua.createHTMLEmail(tEmail.name, tEmail.folder, tEmail.footer, tEmail.header, tEmail.emailGroup, tEmail.subject, tEmail.html , function(err, res)
      {
        /*
        console.log('err');
        console.log(err);
        console.log(err.msg[0]);
        console.log('res');
        */
        //console.log(res);
        //console.log(res.metadata);
        //console.log(res.elements[0].elements[0]);
       
        (err === null).should.be.true;
        (res === null).should.be.false;
        res.type.should.eql('Email');
        tEmail.id = res.id;
        done();
      });
    });  

    it.skip('getEmail', function(done) 
    {
      eloqua.getEmailById(tEmail.id, 'complete', function(err, res)
      {
        /*
        console.log('err');
        console.log(err);
        console.log(err.msg[0]);
        console.log('res');
        */
        //console.log(res);
        //console.log(res.metadata);
        //console.log(res.elements[0].elements[0]);
       
        (err === null).should.be.true;
        (res === null).should.be.false;
        res.type.should.eql('Email');
        res.name.should.eql(tEmail.name);
        res.subject.should.eql(tEmail.subject);
    
        done();
      });
    });

    it('getEmailEncoding', function(done) 
    {
      this.timeout(25000);
      
      eloqua.getEmailEncoding('minimal', function(err, res)
      {
        /*
        console.log('err');
        console.log(err.msg[0]);
        console.log('res');
        */
        console.log(err);
        console.log(res);
        //console.log(res.metadata);
        //console.log(res.elements[0].elements[0]);
       
        (err === null).should.be.true;
        (res === null).should.be.false;

    
        done();
      });
    });

    it.skip('updateHTMLEmail', function(done) 
    {
      eloqua.updateHTMLEmail(tEmail.id, tEmail.name, tEmail.folder, tEmail.footer, tEmail.header, tEmail.emailGroup, tEmail.subject, tEmail.html , function(err, res)
      {
        /*
        console.log('err');
        console.log(err);
        console.log(err.msg[0]);
        console.log('res');*/
        
        console.log(res);
        //console.log(res.metadata);
        //console.log(res.elements[0].elements[0]);
       
        (err === null).should.be.true;
        (res === null).should.be.false;
        res.type.should.eql('Email');
 
        done();
      });
    });

    it.skip('sendTestEmail', function(done) 
    {
      eloqua.sendTestEmail('1', '116', 'AutomatedTestDeployment' , function(err, res)
      {
        /*
        console.log('err');
        console.log(err);
        console.log(err.msg[0]);
        console.log('res');*/
        
        console.log(err);
        console.log(res);
        //console.log(res.metadata);
        //console.log(res.elements[0].elements[0]);
       
        (err === null).should.be.true;
        (res === null).should.be.false;
 
        done();
      });
    });

   
 
  });

});
