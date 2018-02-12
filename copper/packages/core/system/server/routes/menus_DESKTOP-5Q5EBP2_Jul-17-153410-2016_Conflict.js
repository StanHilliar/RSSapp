'use strict';

var mean = require('meanio');

module.exports = function(System, app, auth, database) {

    app.route('/api/admin/menu/:name').get(generateMenu);
    app.route('/api/:company/admin/menu/:name').get(generateMenu);


    function generateMenu(req, res) 
      {
            var roles = req.user ? JSON.parse(JSON.stringify(req.acl.user.allowed)) : ['anonymous'],
            menu = req.params.name || 'main',
            defaultMenu = req.query.defaultMenu || [],
            itemsRes = [],
            tmpMenu;

            console.log('api/admin/menu/');
            console.log(req.params.company);
            var companyRoles = [];    
            if(req.params.company)
            {
                for(var i = 0; i < req.user.companies.length; i++)
                {
                    if(req.user.companies[i].id == req.params.company)
                    {
                        companyRoles = req.user.companies[i].roles;
                    }
                }
            }
            if(companyRoles == undefined)
            {
                companyRoles = [];
            }
            //var roles = req.user.company ? JSON.parse(JSON.stringify(req.acl.user.allowed)) : [];

            if (menu === 'main' && roles.indexOf('admin') !== -1) 
            {
                roles.splice(roles.indexOf('admin'), 1);
            } 
            else 
                if (menu === 'modules') 
                {
                    menu = 'main';
                    tmpMenu = 'modules';
                }


            if (!Array.isArray(defaultMenu)) defaultMenu = [defaultMenu];

            var items = mean.menus.get(
            {
                roles: roles,
                menu: menu,
                defaultMenu: defaultMenu.map(
                    function(item) 
                    {
                        return JSON.parse(item);
                    })
            });

            if (menu !== 'main') return res.json(items);


            items.forEach(function(item) 
            {
               // console.log(item);
                if (tmpMenu && tmpMenu === 'modules' && item.roles.indexOf('admin') > -1)
                {
                    itemsRes.push(item);
                } 
                else
                {
                    if (!tmpMenu && menu === 'main' && item.roles.indexOf('admin') < 0) 
                    {
                        var _addIt = false;
                        if(item.weight && item.weight.length > 0)
                        {
                            for(var i = 0; i < companyRoles.length; i++)
                            {
                                if(item.weight.indexOf(companyRoles[i]) > -1)
                                {
                                    _addIt = true;
                                }
                            }
                        }
                        else
                        {
                            _addIt = true;
                        }

                        if(_addIt)
                        {
                            itemsRes.push(item);
                        }
                    } 
                } 
                    
            });

            res.json(itemsRes);

        };
};
