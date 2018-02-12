'use strict';

var amazingEloqua = require('../lib/amazing_eloqua_login.js')(),
should = require('should');

var companyName = 'TechnologyPartnerLeadMgtTechSolutionsAB';
var username ='Simon.Diel';
var password = 'DSpZlkaRIJ8807t0';
var host = 'https://secure.p02.eloqua.com';


/* jshint -W030 */
describe('amazing_eloqua_login.js', function() 
{
  describe('getCampaigns', function() 
  {
    var eloqua;
    var simpleCampaign = 
    {
      id: null,
      name: 'SimonTest_12345' 
    };

    before(function() 
    {
      eloqua = amazingEloqua.login(companyName, username, password, host);  // Important choose the right base url
    })

    it('searchforCampaigns', function(done) 
    {
   
      eloqua.campaign.search('TestCampaign44', '1', '100', 'complete', function(err, res)
      {
        /*
        console.log('err');
        console.log('res');
        console.log(res.elements[0].elements[0]);*/
        //console.log(err);
        //console.log(res);
       
        (err === null).should.be.true;
        (res === null).should.be.false;
        if(res != null)
        {
          res.elements.should.be.an.instanceOf(Array);
        }
        done();
      });
    });

    it('create Campaign', function(done) 
    {
      eloqua.campaign.create('TestCampaign2', null, null, null, null, null, null, false, false, null, null, 'emailMarketing', null, function(err, res)
      {
        
        console.log('err');
        console.log(err);
        if(err != null)
        {
          console.log(err.msg[0]);
        }
        console.log('res');
        console.log(res);
       
        (err === null).should.be.true;
        (res === null).should.be.false;
      
        done();
      });
    });   

    it('create simpleCampaign', function(done) 
    {
      eloqua.campaign.createSimple({name: simpleCampaign.name}, function(err, res)
      {
        /*
        console.log('err');
        console.log(err);
        if(err != null)
        {
          console.log(err.msg[0]);
        }
        console.log('res');
        console.log(res);*/
       
        simpleCampaign.id = res.id;
        (err === null).should.be.true;
        (res === null).should.be.false;
      
        done();
      });
    });

    it('get Campaign | id & depth=minimal', function(done) 
    {
      eloqua.campaign.get(simpleCampaign.id, { depth: 'minimal'}, function(err, res)
      {
        (err === null).should.be.true;
        (res === null).should.be.false;

        res.name.should.eql(simpleCampaign.name);
      
        done();
      });
    });

    it('get Campaign | id & depth=complete', function(done) 
    {
      eloqua.campaign.get(simpleCampaign.id,  {depth: 'complete'}, function(err, res)
      {
        (err === null).should.be.true;
        (res === null).should.be.false;

        res.name.should.eql(simpleCampaign.name);
      
        done();
      });
    });      

    it('get Campaign | id & depth=invAlid12', function(done) 
    {
      eloqua.campaign.get(simpleCampaign.id,  {depth: 'invAlid12'}, function(err, res)
      {
        (err === null).should.be.true;
        (res === null).should.be.false;

        res.name.should.eql(simpleCampaign.name);
      
        done();
      });
    });    

    it('get Campaign | empty id' , function(done) 
    {
      eloqua.campaign.get('',  {}, function(err, res)
      {
        (err === null).should.be.false;
        (err.code === null).should.be.false;
        (res === null).should.be.true;

        if(err.code)
        {
          err.code.should.eql('AE100');
        }
        else
        {
          false.should.be.true;
        }
      
        done();
      });
    });    

    // --- activation -----------------------------------

    it('activate SimpleCampaign | segment not set' , function(done) 
    {
      eloqua.campaign.acitivate(simpleCampaign.id, {}, function(err, res)
      {
        (err === null).should.be.false;
        (res === null).should.be.true;

        if(err.code)
        {
          err.code.should.eql(400);
        }
        else
        {
          false.should.be.true;
        }
      
        done();
      });
    });



    it('update SimpleCampaign ' , function(done) 
    {
      simpleCampaign.emailId = 163;
      simpleCampaign.segmentId = 9;
      simpleCampaign.isAllowingResend = true;
      simpleCampaign.startAt = Math.floor(Date.now() / 1000);
      simpleCampaign.endAt = simpleCampaign.startAt +63072000;

      eloqua.campaign.updateSimple(simpleCampaign.id, simpleCampaign, function(err, res)
      {
        (err === null).should.be.true;
        (res === null).should.be.false;

        done();
      });
    });


    it('activate SimpleCampaign | activate now ' , function(done) 
    {
      //eloqua.campaign.acitivate(simpleCampaign.id, {activateNow: true}, function(err, res)
      eloqua.campaign.acitivate(simpleCampaign.id, {scheduledFor: Math.floor(Date.now() / 1000)+240}, function(err, res)
      {
        (err === null).should.be.true;
        (res === null).should.be.false;
        if(err && err.msg)
        {
          console.log(err.msg);
        }
        console.log(res);
      
        done();
      });
    });


    it('delete Campaign', function(done) 
    {
      eloqua.campaign.delete(simpleCampaign.id, function(err, res)
      {
        (res === null).should.be.false;
        (err === null).should.be.true;
        
        eloqua.campaign.get(simpleCampaign.id, {depth: 'minimal'}, function(getErr, getRes)
        {
          
          //console.log('err');
          //console.log(getErr);
          if(getErr !== null)
          {
            if(getErr.msg)
            {
              console.log(getErr.msg[0]);
            }
          }
          //console.log('res');
          //console.log(getRes);
         
          (getErr === null).should.be.true;
          (getRes === null).should.be.false;
        
          done();
        });
      });
    });


 
  });

});
