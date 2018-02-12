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
var EloquaEmailSchema = new Schema(
{
    type:   
    {
      type: String,
      required: true
    },
    currentStatus:
    {
      type: String
    },
    companyandid:
    {
      type: String,
      unique: true,
      required: true
    },  
    id:
    {
      type: String,
      required: true
    },
    createdAt:
    {
      type: String,
      required: true
    },
    createdBy:
    {
      type: String
    },
    depth: 
    {
      type: String
    },
    folderId:
    {
      type: String
    },
    name:
    {
      type: String
    }, 
    permissions:
    {
      type: String
    },
    updatedAt:
    {
      type: String
    },
    updatedBy:
    {
      type: String
    },
    bounceBackEmail:
    {
      type: String
    },
    emailGroup:
     {
      type: String
    },
    isPlainTextEditable:
    {
      type: Boolean
    },
    isTracked:
    {
      type: Boolean
    },
    replyToEmail:
    {
      type: String
    },
    replyToName:
    {
      type: String
    },
    sendPlainTextOnly:
    {
      type: String
    },
    senderEmail:
    {
      type: String
    },
    senderName:
    {
        type: String
    },
    style:
    {
        type: String
    },
    subject:
    {
     type: String
    }  
});




mongoose.model('EloquaEmail', EloquaEmailSchema);
