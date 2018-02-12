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
var EloquaBasicUserSchema = new Schema(
{
    site_id:
    {
        type: String,
        //required: true
    },
    site_name:
    {
    	type: String
    },
    id:
    {
        type: String,
        unique: true,
        required: true
    },
    meanuser_id:
    {
        type: String,
        required: true
    },
    company:
    {
        type: String,
        required: true
    },
    username:
    {
        type: String,
        required: true
    },
    password:
    {
        type: String,
        required: true
    },
    base_url:
    {
        type: String,
        required: true
    }
});




mongoose.model('EloquaBasicUser', EloquaBasicUserSchema);
