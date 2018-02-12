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
var EloquaUser = new Schema(
{
    site_id:
    {
        type: String,
        required: true
    },
    company:
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
    user_id:
    {
        type: String
    },
    username:
    {
        type: String
    },
    user_displayName:
    {
        type: String
    },
    user_emailAddress:
    {
        type: String,
        required: true
    },
    accessToken:
    {
        type: String,
        required: true
    },
    refreshToken:
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



mongoose.model('eloquaUser', EloquaUser);
