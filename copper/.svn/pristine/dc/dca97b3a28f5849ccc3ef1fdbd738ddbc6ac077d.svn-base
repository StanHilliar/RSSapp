'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Elocore = new Module('elocore');

var Ec_lighbox_app = require('./server/models/ec_lighbox_app');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Elocore.register(function(app, auth, database) 
{

  //We enable routing. By default the Package Object is passed to the routes
  Elocore.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  /*Elocore.menus.add({
    title: 'elocore example page',
    link: 'elocore example page',
    roles: ['authenticated'],
    menu: 'main'
  });*/
  
  Elocore.aggregateAsset('css', 'elocore.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Elocore.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Elocore.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Elocore.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  Elocore.getEloqua = function()
  {
    return 'hello world';
  };

  Elocore.createLightboxApp = function(instance, site_name, site_id, install_id, cb)
  {
    Ec_lighbox_app.findOne(
    {
        instanceid: instance
    }, function(err, lightboxapp)
    {
        console.log('createEloquaApp inner callback');
        if (err)
        {
            return cb({'error':err}, {'success': false});
        }
        if (!lightboxapp)
        {
            var app = new Ec_lighbox_app(
            {
                instanceid  : instance,
                site        : site_name,
                site_id     : site_id,
                install_id  : install_id,
                button_class : '',
                button_text : '',
                lightbox_title : '',
                lightbox_content: ''
            });
            app.save(function(err)
            {
                if (err) 
                {
                    console.log(err);
                    return cb(err, {'success': false});
                }

                return cb({}, {'success': true});
            });
        }
        else
        {
            return cb({'error':'allready in database'}, {'success': false});
        }
    });
  };

  Elocore.updateLightboxApp = function(instance, button_text, button_class, lightbox_title, lightbox_content, cb)
  {
    Ec_lighbox_app.findOne(
    {
        instanceid: instance
    }, function(err, lightboxapp)
    {
        if (err)
        {
            return cb({'error':err}, {'success': false});
        }
        if (!lightboxapp)
        {
           return cb({'error':'not in database'}, {'success': false});
        }
        else
        {
            lightboxapp.button_text = button_text;
            lightboxapp.button_class = button_class;
            lightboxapp.lightbox_title = lightbox_title;
            lightboxapp.lightbox_content = lightbox_content;
            lightboxapp.save(function(err)
            {
                if (err) 
                {
                    return cb(err, {'success': false});
                }

                return cb({}, {'success': true});
            });
        }
    });
  };


  Elocore.loadLightboxApp = function(instance, cb)
  {
    Ec_lighbox_app.findOne(
    {
        instanceid: instance
    }, function(err, lightboxapp)
    {

        if (err)
        {
            return cb({'error':err}, {'success': false});
        }
        if (!lightboxapp)
        {
           return cb({'error':'not in database'}, {'success': false});
        }
        else
        {
            return cb({}, {'success': true, data: lightboxapp.toJSON()});
        }
    });
  };



  return Elocore;
});
