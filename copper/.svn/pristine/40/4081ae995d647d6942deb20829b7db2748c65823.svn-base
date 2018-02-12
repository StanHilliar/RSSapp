'use strict';

angular.module('mean.admin').controller('CompaniesController', ['$scope', 'Global', 'Menus', '$rootScope', '$http', 'Companies', 'Invites', 'Circles',
    function($scope, Global, Menus, $rootScope, $http, Companies, Invites, Circles) 
    {
        $scope.global = Global;
        $scope.user = {};
        $scope.showForm = false;

        $scope.formSettings = {};
        $scope.formSettings.companyOptions = [];

        Circles.mine(function(acl) 
        {
            var circles = acl.allowed;

            console.log(circles);

            $scope.userSchema = 
            [
            {
                title: 'Email',
                schemaKey: 'email',
                type: 'email',
                inTable: true
            }, {
                title: 'First Name',
                schemaKey: 'firstname',
                type: 'text',
                inTable: true
            },
              {
                title: 'Last Name',
                schemaKey: 'lastname',
                type: 'text',
                inTable: true
            },
              {
                title: 'Companies',
                schemaKey: 'companies',
                type: 'company',
                inTable: true
            }, {
                title: 'Username',
                schemaKey: 'username',
                type: 'text',
                inTable: true
            }, {
                title: 'Roles',
                schemaKey: 'roles',
                type: 'select',
                options: circles,
                inTable: true
            }, {
                title: 'Password',
                schemaKey: 'password',
                type: 'password',
                inTable: false
            }, {
                title: 'Repeat password',
                schemaKey: 'confirmPassword',
                type: 'password',
                inTable: false
            }];
            
        });



        $scope.init = function() 
        {   
            console.log('companies init');

            Companies.query({}, function(companies) 
            {
                console.log(companies);
                $scope.companies = companies;
                $scope.formSettings.companyOptions = [];
                for(var i = 0; i < companies.length; i++)
                {
                     $scope.formSettings.companyOptions[i] ={};
                     $scope.formSettings.companyOptions[i].id =companies[i]._id;
                     $scope.formSettings.companyOptions[i].name =companies[i].name;
                }
                console.log( $scope.formSettings.companyOptions);
            });
        };

        $scope.add = function(valid) {
            if (!valid) return;
            if (!$scope.users) $scope.users = [];


        /*    var user = new Users({
                email: $scope.user.email,
                name: $scope.user.name,
                username: $scope.user.username,
                password: $scope.user.password,
                confirmPassword: $scope.user.confirmPassword,
                roles: $scope.user.roles
            });

            user.$save(function(data, headers) {
                $scope.user = {};
                $scope.users.push(user);
                $scope.userError = null;
            }, function(data, headers) {
                $scope.userError = data.data;
            });*/
        };     

        $scope.invite = function(valid) 
        {
            console.log('invite');
            if (!valid) return;
            if (!$scope.users) $scope.users = [];


            var invite = new Invites(
            {
                email: $scope.user.email,
                company: $scope.user.companies,
            });

            invite.$save(function(data, headers) 
            {
                console.log('callback 1');
            }, function(data, headers) 
            {
                console.log('callback 2');
            });

            /*
            var mycompanies = Companies.invite().put({companyid: $scope.user.companies[0], email: $scope.user.email}, function()
            {
                console.log(mycompanies);
            });*/

        /*    var user = new Users({
                email: $scope.user.email,
                name: $scope.user.name,
                username: $scope.user.username,
                password: $scope.user.password,
                confirmPassword: $scope.user.confirmPassword,
                roles: $scope.user.roles
            });

            user.$save(function(data, headers) {
                $scope.user = {};
                $scope.users.push(user);
                $scope.userError = null;
            }, function(data, headers) {
                $scope.userError = data.data;
            });*/
        };

        $scope.remove = function(user) {
            for (var i in $scope.users) {
                if ($scope.users[i] === user) {
                    $scope.users.splice(i, 1);
                }
            }

            user.$remove();
        };

        $scope.update = function(user, userField) {
            if (userField && userField === 'roles' && user.tmpRoles.indexOf('admin') !== -1 && user.roles.indexOf('admin') === -1) {
                if (confirm('Are you sure you want to remove "admin" role?')) {
                    user.$update();
                } else {
                    user.roles = user.tmpRoles;
                }
            } else
                user.$update();
        };

        $scope.beforeSelect = function(userField, user) {
            if (userField === 'roles') {
                user.tmpRoles = user.roles;
            }
        };
    }
]);
