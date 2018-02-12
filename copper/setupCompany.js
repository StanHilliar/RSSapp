'use strict';

/*
mongodb

use mean-dev

db["circles"].find()

db["users"].find()


db.users.update(
    { email: "simon@thecrftrs.com" },
    {
      $set: {
        companies : [  {  "name" : "thecrftrs", roles:['Company_Admin', 'Admin','thecrftrs'],  "id" : ObjectId("567b02ae882cf5b25f7e9769") } ] 
      }
    }
)


db.users.update(
    { email: "simon@thecrftrs.com" },
    {
      $set: {
        roles:['Admin', 'admin', 'authenticated'] 
        } 
      
    }
)

db.circles.insert({ "name" : "Company_Admin" })

db.circles.insert({ "name" : "thecrftrs", "circles" : [  "Company_Admin" ] })
*/


var mongoose  = require('mongoose');

// mongoose.connect('mongodb://' + (process.env.DB_PORT_27017_TCP_ADDR || 'localhost') + '/mean-prod');
mongoose.connect('mongodb://' + (process.env.DB_PORT_27017_TCP_ADDR || 'localhost') + '/mean-dev');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

require('./packages/core/users/server/models/company.js');

// var User      = mongoose.model('User');
var Company   = mongoose.model('Company');


var _company = 'thecrftrs';

Company.find(
{
  name: _company
}, function(errCompany, companies)
{
  if(errCompany)
  {
    throw  errCompany;
  }
  console.log(companies);
  var myCompany = companies[0];

  myCompany.products.push('BISMUTH');

  myCompany.save();
});

