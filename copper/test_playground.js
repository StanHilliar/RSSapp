var amazingEloqua = require('amazing-eloqua')();

var config = require('meanio').loadConfig();

var eloqua = amazingEloqua.login(config.eloqua.company, config.eloqua.username, config.eloqua.password, config.eloqua.host);

console.log(config.eloqua.company);

var startAt = new Date();
var endAt = new Date(startAt.getTime() + 86400000);

var data =
{
	name: 'test4567', 
	folderId : '482',
	campaignType : 'contact',
	elements: [] 
	
	//startAt : Math.ceil(startAt.getTime() / 1000),
	//endAt : Math.ceil(endAt.getTime()   / 1000)
}
   data.elements.push(_generateCampaignEmail('-333555', '58'));
   data.elements.push(_generateCampaignSegment('-888999', '2', '-333555'));
// data.elements.push(
// 	{
// 		type: 'CampaignSegment',
//   		id: '-500021',
//   		name: 'Segment Members',
// 	    outputTerminals:
// 	     [ { type: 'CampaignOutputTerminal',
// 	         id: '-500022',
// 	         connectedId: '259',
// 	         connectedType: 'CampaignEmail',
// 	         terminalType: 'out' } ],
// 	    position: { type: 'Position', x: '123', y: '55' },
// 	    //segmentId: '2' 
// 	}
// );

// data.elements.push(
// 	{ 
// 		type: 'CampaignEmail',
// 	    id: '-500022',
// 	    name: 'Email',
// 	    outputTerminals: [],
// 	    position: { type: 'Position', x: '123', y: '181' },
// 	    //emailId: '58',
// 	    includeListUnsubscribeHeader: 'true',
// 	    sendTimePeriod: 'sendAllEmailAtOnce' 
// 	});


function _generateCampaignEmail(referenceId, emailId, isAllowingResend)
{
    //console.log('_generateCampaignEmail');
    var campaignEmail = {};
    campaignEmail['id'] = referenceId;
    campaignEmail['type'] = 'CampaignEmail';
    campaignEmail['emailId'] = emailId;
    campaignEmail['sendTimePeriod'] = 'sendAllEmailAtOnce';
    campaignEmail['position'] = {};
    campaignEmail['position']['type'] = 'Position';
    campaignEmail['position']['x'] = '100';
    campaignEmail['position']['y'] = '100';
    campaignEmail['isAllowingResend'] = false;
    if(isAllowingResend !== null && isAllowingResend !==undefined && isAllowingResend === true)
    {
    	campaignEmail['isAllowingResend'] = true;	
    }

   return campaignEmail;
};

function _generateCampaignSegment(referenceId, segmentId, outputElementId)
{
    var campaignSegment = {};

    campaignSegment['id'] = referenceId;
    campaignSegment['type'] = 'CampaignSegment';
    campaignSegment['segmentId'] = segmentId;
    campaignSegment['isRecurring'] = false;
    campaignSegment['position'] = {};
    campaignSegment['position']['type'] = 'Position';
    campaignSegment['position']['x'] = '10';
    campaignSegment['position']['y'] = '10';
    campaignSegment['outputTerminals'] = [];

    var terminal = {};
    terminal['type'] = 'CampaignOutputTerminal';
    terminal['connectedId'] = outputElementId;
    terminal['connectedType'] = 'CampaignEmail';
    terminal['terminalType'] = 'out';

    campaignSegment['outputTerminals'].push(terminal);

   return campaignSegment;
};

function create(data)
{
	console.log(data);

	eloqua.campaign.createQ(data, function(err, response)
	{
	  console.log('createCampaign callback');
	  console.log(err);
	  console.log(response);
	}); 
}
//create(data);

function get(id)
{
	eloqua.campaign.get(id, {}, function(e,r)
	{
		console.log(e);
		console.log(r);
		console.log(r.elements[0]);
		console.log(r.elements[1]);
		console.log(r.elements[2]);
	});
}

//get('151');

function acitivate(id)
{
	eloqua.campaign.acitivate(id, {activateNow: true}, function(e,r)
	{
		console.log(e);
		if(e)
		{
			console.log(e.msg);
		}
		console.log(r);
	});
}

acitivate('157')

