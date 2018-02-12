'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    //crypto = require('crypto');
 

/**
 * User Schema
 */
var Ec_lighbox_app = new Schema(
{
    instanceid: 
    { 
        type: String, 
        unique: true,
        required: true
    },
    site:
    {
    	type: String
    },
    site_id:
    {
    	type: String
    },
    install_id:
    {
    	type: String
    },
    button_text:
    {
        type: String
    },  
    button_class:
    {
        type: String
    },  
    lightbox_title:
    {
        type: String
    },
    lightbox_content:
    {
        type: String
    }
});




module.exports = mongoose.model('Ec_lighbox_app', Ec_lighbox_app);
