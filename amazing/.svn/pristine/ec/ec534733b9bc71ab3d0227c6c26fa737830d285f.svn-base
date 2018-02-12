var Campaign;

var _eloqua = null;

module.exports = Campaign = function(eloqua)
{
  _eloqua = eloqua;
}

Campaign.prototype.search = function(search, page, count, depth, cb)
{
    _eloqua.get('/API/REST/2.0/assets/campaigns?search='+search+'&page='+page+'&count='+count+'&depth='+depth+'', cb);
};

Campaign.prototype.create = function(name, folderId, permissions, actualCost, budgetedCost, campaignType, fieldValues, isMemberAllowedReEntry, isReadOnly, product, region, campaignCategory, elements, cb)
{
    var data = {};

    data['name'] =  name;

    if(folderId)
    {
        data['folderId'] =  folderId;
    }  
    if(permissions)
    {
        data['permissions'] =  permissions;
    }    
    if(actualCost)
    {
        data['actualCost'] =  actualCost;
    }    
    if(actualCost)
    {
        data['actualCost'] =  actualCost;
    }   
    if(budgetedCost)
    {
        data['budgetedCost'] =  budgetedCost;
    }    
    if(campaignType)
    {
        data['campaignType'] =  campaignType;
    }    
    if(fieldValues)
    {
        data['fieldValues'] =  fieldValues;
    }    
    if(isMemberAllowedReEntry)
    {
        data['isMemberAllowedReEntry'] =  isMemberAllowedReEntry;
    }
    if(isReadOnly)
    {
        data['isReadOnly'] =  isReadOnly;
    }
    if(product)
    {
        data['product'] =  product;
    }
    if(region)
    {
        data['region'] =  region;
    }
    if(campaignCategory)
    {
        data['campaignCategory'] =  campaignCategory;
    }

    _eloqua.post('/API/REST/2.0/assets/campaign', data, function(err, response)
    {
        
        //console.log('callback ->');
        cb(err, response);
    });
};

Campaign.prototype.createQ = function(data, cb)
{
    _eloqua.post('/API/REST/2.0/assets/campaign', data, function(err, response)
    {
        
        //console.log('callback ->');
        cb(err, response);
    });
};

Campaign.prototype.createSimple = function(options, cb)
{
    var elements = [];
    elements.push(_generateCampaignEmail('-333555', options.emailId));
    elements.push(_generateCampaignSegment('-888999', options.segmentId, '-333555'));

    console.log(elements);

    _postCampaign('post', null, options.name, options.folderId, null, null, null, null, null, false, false, null, null, 'emailMarketing', elements, options.startAt, options.endAt, cb)
};

Campaign.prototype.get = function(id, options, cb)
{
    var path = '/API/REST/2.0/assets/campaign/';

    if(id !== null && id !== undefined && id !== '')
    {
        path += id;
    }
    else
    {
        return cb(new Error({code: 'AE100', msg: 'id must not be empty'}));
    }    

    if(options.depth !== null && options.depth !== undefined && options.depth !== '')
    {
        path += '?depth='+options.depth;
    }

    return _eloqua.get(path, cb);
};

Campaign.prototype.delete = function(id, cb)
{
    var path = '/API/REST/2.0/assets/campaign/';

    if(id !== null && id !== undefined && id !== '')
    {
        path += id;
    }
    else
    {
        return cb(new Error({code: 'AE100', msg: 'id must not be empty'}));
    }   

    _eloqua.remove(path, cb);
};

Campaign.prototype.updateSimple = function(id, options, cb)
{
    var elements = [];
    elements.push(_generateCampaignEmail('-333555', options.emailId, options.isAllowingResend));
    elements.push(_generateCampaignSegment('-888999', options.segmentId, '-333555'));

    //console.log(elements);
    
    _postCampaign('put', id, options.name, options.folderId, null, null, null, null, null, false, false, null, null, 'emailMarketing', elements, options.startAt, options.endAt, cb)
};

Campaign.prototype.acitivate = function(id, options, cb)
{
    var path = '/API/REST/2.0/assets/campaign/active/';
  
    if(id !== null && id !== undefined && id !== '')
    {
        path += id;
    }
    else
    {
        return cb(new Error({code: 'AE100', msg: 'id must not be empty'}));
    }   

    var isFirstParam = true;

    if(options.scheduledFor !== null && options.scheduledFor !== undefined && options.scheduledFor !== '')
    {
        if(isFirstParam) path += '?'; else path += '&';
        path += 'scheduledFor='+options.scheduledFor;
    }   

    if(options.activateNow !== null && options.activateNow !== undefined && options.activateNow !== '')
    {
         if(isFirstParam) path += '?'; else path += '&';
        path += 'activateNow='+options.activateNow;
    }   

    if(options.runAsUserId !== null && options.runAsUserId !== undefined && options.runAsUserId !== '')
    {
        if(isFirstParam) path += '?'; else path += '&';
        path += 'runAsUserId='+options.runAsUserId;
    }

    console.log(path);

    _eloqua.post(path, {}, cb);
};

Campaign.prototype.deacitivate = function(id, cb)
{
    _eloqua.post('/API/REST/2.0/assets/campaign/draft/'+id, {}, cb);
};

function _postCampaign(method, id, name, folderId, permissions, actualCost, budgetedCost, campaignType, fieldValues, isMemberAllowedReEntry, isReadOnly, product, region, campaignCategory, elements, startAt, endAt, cb)
{
    var data = {};

    data['name'] =  name;
    var path = '';
    if(id)
    {
        data['id'] =  id;
        path = '/'+id;
    }  
    if(folderId)
    {
        data['folderId'] =  folderId;
    }  
    if(permissions)
    {
        data['permissions'] =  permissions;
    }    
    if(actualCost)
    {
        data['actualCost'] =  actualCost;
    }    
    if(actualCost)
    {
        data['actualCost'] =  actualCost;
    }   
    if(budgetedCost)
    {
        data['budgetedCost'] =  budgetedCost;
    }    
    if(campaignType)
    {
        data['campaignType'] =  campaignType;
    }    
    if(fieldValues)
    {
        data['fieldValues'] =  fieldValues;
    }    
    if(isMemberAllowedReEntry)
    {
        data['isMemberAllowedReEntry'] =  isMemberAllowedReEntry;
    }
    if(isReadOnly)
    {
        data['isReadOnly'] =  isReadOnly;
    }
    if(product)
    {
        data['product'] =  product;
    }
    if(region)
    {
        data['region'] =  region;
    }
    if(campaignCategory)
    {
        data['campaignCategory'] =  campaignCategory;
    }   
    if(elements)
    {
        data['elements'] =  elements;
    }
    
    if(startAt)
    {
        data['startAt'] =  startAt;
    }
    if(endAt)
    {
        data['endAt'] =  endAt;
    }

    console.log(data);

    if(method == 'put')
    {
        _eloqua.put('/API/REST/2.0/assets/campaign'+path, data, cb);
    }
    else
    {

        _eloqua.post('/API/REST/2.0/assets/campaign'+path, data, cb);
    }
};

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
    
    /*
    {  
       id: referenceId,
       type: "CampaignEmail",  
       emailId : emailId,  
       sendTimePeriod : "sendAllEmailAtOnce",  
       position:
                {  
                    type: 'Position',
                    x : '100',  
                    y : '100'  
                }
   }; */
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
    /*
   return  
   {  
       id: referenceId,  
       type: "CampaignSegment",  
       segmentId: segmentId,  
       isRecurring: false,  
       position:   
                {  
                    type: 'Position',
                    x : '10',  
                    y : '10'  
                },  
       outputTerminals : [{  
                                type: 'CampaignOutputTerminal',
                                connectedId: outputElementId,  
                                connectedType: "CampaignEmail",  
                                terminalType: "out"   
                            }]

   }; */
   return campaignSegment;
};