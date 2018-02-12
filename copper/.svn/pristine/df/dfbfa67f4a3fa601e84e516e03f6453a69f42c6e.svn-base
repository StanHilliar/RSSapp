'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;
var Companyadmin = new Module('companyadmin');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */

Companyadmin.register(function(app, auth, database) {

    var icons = 'admin/assets/img/icons/';

    Companyadmin.menus.add({
        title: 'cadmin settings',
        link: 'admin settings',
        roles: ['admin'],
        menu: 'main'
    });

    Companyadmin.menus.add({
        roles: ['Company_Admin'],
        title: 'MODULES',
        link: 'modules',
        icon: icons + 'modules.png',
        menu: 'admin'
    });
    Companyadmin.menus.add({
        roles: ['Company_Admin'],
        title: 'THEMES',
        link: 'themes',
        icon: icons + 'themes.png',
        menu: 'admin'
    });
    Companyadmin.menus.add({
        roles: ['Company_Admin'],
        title: 'SETTINGS',
        link: 'settings',
        icon: icons + 'settings.png',
        menu: 'admin'
    });
    Companyadmin.menus.add({
        roles: ['Company_Admin'],
        title: 'USERS',
        link: 'users',
        icon: icons + 'users.png',
        menu: 'admin'
    });
    Companyadmin.menus.add({
        roles: ['Company_Admin'],
        title: 'COMPANIES',
        link: 'companies',
        icon: icons + 'users.png',
        menu: 'admin'
    });    

    Companyadmin.menus.add({
        roles: ['authenticated'],
        companyroles: ['Company_Admin'],
        title: 'Users',
        link: 'companyusers',
        icon: icons + 'users.png',
        weight: ['Company_Admin'],
        menu: 'main'
    });


    Companyadmin.aggregateAsset('css', 'admin.css');
    Companyadmin.aggregateAsset('js', '../lib/ng-clip/src/ngClip.js', {
        absolute: false,
        global: true
    });

    Companyadmin.aggregateAsset('js', '../lib/zeroclipboard/dist/ZeroClipboard.js', {
        absolute: false,
        global: true
    });

    Companyadmin.angularDependencies(['ngClipboard']);

    // We enable routing. By default the Package Object is passed to the routes
    Companyadmin.routes(app, auth, database);
    return Companyadmin;
});
