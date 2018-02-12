'use strict';

angular.module('mean.admin').controller('UsersController', ['$scope', 'Global', 'Menus', '$rootScope', '$http', 'Users', 'Circles', 'Companies',
    function($scope, Global, Menus, $rootScope, $http, Users, Circles, Companies) 
    {
        $scope.global = Global;
        $scope.user = {};
        $scope.userCompanies = [];
        $scope.userCompanyRoles = [];

        var availableCompanies = [];
        Companies.query({}, function(companies) 
        {
            console.log(companies);
           
            for(var i = 0; i < companies.length; i++)
            {
                availableCompanies.push({id: companies[i]._id, name: companies[i].name})
            }
            console.log(availableCompanies);
            Circles.mine(function(acl) 
            {
                var circles = acl.allowed;

                $scope.userSchema = 
                [
                {
                    title: 'Email',
                    schemaKey: 'email',
                    type: 'email',
                    inTable: true
                }, 
                {
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
                    type: 'array',
                    inTable: true,
                    elements: 
                    [
                        {
                            title: 'name',
                            schemaKey: 'name',
                            type: 'companies',
                            options: availableCompanies,
                            inTable: true
                        }, 
                        {
                            title: 'Roles',
                            schemaKey: 'roles',
                            type: 'roles',
                            options: circles,
                            inTable: true
                        }
                    ]
                }, 
                {
                    title: 'Username',
                    schemaKey: 'username',
                    type: 'text',
                    inTable: true
                }, 
                {
                    title: 'Roles',
                    schemaKey: 'roles',
                    type: 'select',
                    options: circles,
                    inTable: true
                }, 
                {
                    title: 'Password',
                    schemaKey: 'password',
                    type: 'password',
                    inTable: false
                },
                {
                    title: 'Repeat password',
                    schemaKey: 'confirmPassword',
                    type: 'password',
                    inTable: false
                }];
                
            });

       
        });



        $scope.init = function() {
            Users.query({}, function(users) 
            {
                $scope.users = users;

                for(var i = 0; i < users.length; i++)
                {   
                    $scope.userCompanies[i] = [];
                    $scope.userCompanyRoles[i] = [];
                    for(var j = 0; j < users[i].companies.length; j++)
                    {
                    //    $scope.userCompanies[i] = {};
                   
                        $scope.userCompanies[i][j] = users[i].companies[j].id;
                        //$scope.userCompanies[i].name = users[i].companies[j].name;
                        $scope.userCompanyRoles[i][j] = users[i].companies[j].roles;
                    }
                }
            });
        };

        $scope.add = function(valid) {
            if (!valid) return;
            if (!$scope.users) $scope.users = [];

            var user = new Users({
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
            });
        };

        $scope.remove = function(user) {
            for (var i in $scope.users) {
                if ($scope.users[i] === user) {
                    $scope.users.splice(i, 1);
                }
            }

            user.$remove();
        };

        $scope.addCompanyToUser = function(userIndex) 
        {
           $scope.users[userIndex].companies.push({name:'', roles:''});
           $scope.userCompanies[userIndex].push('');
           $scope.userCompanyRoles[userIndex].push('');
        };

        $scope.update = function(user, userField) 
        {
            for(var i = 0; i < $scope.users.length; i++)
            {   
                for(var j = 0; j < $scope.users[i].companies.length; j++)
                {
                    $scope.users[i].companies[j].id =  $scope.userCompanies[i][j];

                    for(var x = 0; x < availableCompanies.length; x++)
                    {
                        if(availableCompanies[x].id == $scope.userCompanies[i][j])
                        {
                            $scope.users[i].companies[j].name = availableCompanies[x].name;
                        }
                    }
                  
                    $scope.users[i].companies[j].roles = $scope.userCompanyRoles[i][j];
                }
            }


            if (userField && userField === 'roles' && user.tmpRoles.indexOf('admin') !== -1 && user.roles.indexOf('admin') === -1) 
            {
                if (confirm('Are you sure you want to remove "admin" role?')) 
                {
                    user.$update();
                } 
                else 
                {
                    user.roles = user.tmpRoles;
                }
            } 
            else user.$update();
        };

        $scope.beforeSelect = function(userField, user) 
        {
            if (userField === 'roles') {
                user.tmpRoles = user.roles;
            }
        };
    }
]);
