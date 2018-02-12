'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Company = mongoose.model('Company'),
    _ = require('lodash');

/**
 * Create user
 */
exports.create = function(req, res, next) 
{
    var company = new Company(req.body);


    // because we set our user.provider to local our models/user.js validation will always be true
    req.assert('type', 'You must enter a type').notEmpty();
    req.assert('name', 'You must enter a name').notEmpty();
    req.assert('owner', 'You must enter a owner').notEmpty();


    var errors = req.validationErrors();
    console.log(errors);
    if (errors) {
        return res.status(400).send(errors);
    }

    // Hard coded for now. Will address this with the user permissions system in v0.3.5
    //user.roles = ['authenticated'];
    company.productTrials = ['GROUPS'];

    company.save(function(err) 
    {
        if (err) 
        {
            switch (err.code) 
            {
                case 11000:
                case 11001:
                    res.status(400).send('name already taken');
                    break;
                default:
                    res.status(400).send('Please fill all the required fields');
            }

            return res.status(400);
        }
        res.jsonp(user);
    });
};

exports.allInvites = function(req, res, next) 
{
   console.error('allInvites - feature not implemented')
};

exports.createInvite = function(req, res, next) 
{
  console.log('createInvite');


    //1 check params
    req.assert('email', 'You must enter a email').notEmpty();
    req.assert('company', 'You must enter a company').notEmpty();
    // 2 get company
    Company.findOne(
        {
            _id: req.body.company
        })
        .exec(function(err, company) 
        {
            if (err) return next(err);
            if (!company) return next(new Error('Failed to load Company ' + id));

            var allreadyHasUser = false;
            for(var i = 0; i <= company.users.length; i++)
            {
                if( (company.users[i] != undefined)  && (company.users[i].email == req.body.email))
                {
                    allreadyHasUser = true;
                }
            }

            if(allreadyHasUser == false)
            {
                company.users.push({_id: undefined, email: req.body.email, status: 'INVITE'});
                company.save();
                 res.jsonp({success: true});
            }
            else
            {
                res.jsonp({success: false});
            }

           
        });

    // 3 add user

    // 4 send email

};

exports.updateInvite = function(req, res, next) 
{
   console.error('updateInvite - feature not implemented')
};

exports.destroyInvite = function(req, res, next) 
{
  console.error('destroyInvite - feature not implemented')
};

/**
 * Find company by id
 */
exports.company = function(req, res, next, id) 
{
    Company
        .findOne({
            _id: id
        })
        .exec(function(err, company) 
        {
            if (err) return next(err);
            if (!company) return next(new Error('Failed to load User ' + id));
            req.company = company;  //TODO check
            next();
        });
};

/**
 * Update a company
 */
exports.update = function(req, res) 
{
    var company = req.company;
    company = _.extend(company, req.body);

    company.save(function(err) 
    {
        res.jsonp(company);
    });
};

/**
 * Delete an company
 */
exports.destroy = function(req, res) 
{
    var company = req.company;

    company.remove(function(err) 
    {
        if (err) 
        {
            res.render('error', 
            {
                status: 500
            });
        } 
        else 
        {
            res.jsonp(company);
        }
    });
};

/**
 * List of Users
 */
exports.all = function(req, res) 
{
    Company.find().exec(function(err, companies) 
    {
        if (err) 
        {
            res.render('error', 
            {
                status: 500
            });
        } 
        else 
        {
            res.jsonp(companies);
        }
    });
};
