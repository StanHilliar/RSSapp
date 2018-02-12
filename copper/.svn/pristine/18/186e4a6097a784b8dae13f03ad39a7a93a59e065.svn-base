'use strict';

/* jshint -W098 */
angular.module('mean.circles').controller('CirclesController', ['$scope', 'Global', 'Circles', 'MeanUser',
    function($scope, Global, Circles, MeanUser) {
        var vm = this;

        vm.global = Global;
        

        vm.availableCircles = [];
        Circles.all(function(acl) 
        {
            for (var index in acl.circles) 
            {
                vm.availableCircles.push(index);
            }
            $scope.circles = acl.circles;
            $scope.availableCircles = vm.availableCircles;
        });


        vm.create = function(valid) {
            if (!valid) return;

            var circle = new Circles(vm.circle);
            circle.$save(function(response) {
                vm.availableCircles.push(circle.name);
                vm.circle = {};
            }, function(err) {
                alert('Cannot save the circle');
            });
        };

        vm.createAdvanced = function(valid) 
        {
            console.log('createAdvanced');
            console.log(vm.circle.circles);
            console.log(vm.children);

            if (!valid) return;

            var circle = new Circles(vm.circle);
            circle.$save(function(response) 
            {
                Circles.all(function(acl) 
                {
                    for(var index in acl.circles)
                    {
                        for(var x = 0; x <  vm.children.length; x++)
                        {
                            if(index == vm.children[x])
                            {
                                acl.circles[index].circles.push(vm.circle.name);
                                $scope.update({name: acl.circles[index].name, parents: acl.circles[index].circles});    
                            }
                        }
                    }

                    vm.availableCircles.push(circle.name);

                    vm.circle = {};
                });
            }, function(err) 
            {
                alert('Cannot save the circle');
            });
        };

        $scope.update = function(aCircle) 
        {   
            console.log('update');
            console.log(aCircle);
            var circle = new Circles({name: aCircle.name, circles: aCircle.parents});
            circle.$update();
        };
    }
]).controller('CompanyCirclesController', ['$scope', 'Global', 'Circles', 'MeanUser',
    function($scope, Global, Circles, MeanUser) {
        var vm = this;

        vm.global = Global;
        
        vm.addingCircle = false;
        vm.availableCircles = [];
        vm.availableCompanyProducts = [];
        vm.availableCompanyProducts.push('RSSAPP');

        vm.circle = {};

        function loadCircles()
        {

            Circles.allCompany({company: MeanUser.company.id}, function(acl) 
            {
                /*
                for (var index in acl.circles) 
                {
                    vm.availableCircles.push(index);
                }
                $scope.availableCircles = vm.availableCircles;*/
                
                var myCircles = {};
                for(var circleIndex in acl.circles)
                {   
                    console.log(circleIndex);
                    if(circleIndex != 'Company_Admin')
                    {
                        myCircles[circleIndex] = acl.circles[circleIndex];
                    }
                }

                $scope.circles = myCircles;
            });      
        }

        loadCircles();


        vm.addCircle = function(circleName)
        {
            vm.circle.circles = [];
            vm.circle.circles.push(circleName);
            vm.addingCircle = true;
        }

        vm.create = function(valid) {
            if (!valid) return;

            var circle = new Circles(vm.circle);
            circle.$save(function(response) {
                vm.availableCircles.push(circle.name);
                vm.circle = {};
                vm.addingCircle = false;
                loadCircles();
            }, function(err) {
                alert('Cannot save the circle');
            });
        };

        vm.createAdvanced = function(valid) 
        {
            console.log('createAdvanced');
            console.log(vm.circle.circles);
            console.log(vm.children);

            if (!valid) return;

            var circle = new Circles(vm.circle);
            circle.$save(function(response) 
            {
                Circles.allCompany({company: MeanUser.company.id}, function(acl) 
                {
                    for(var index in acl.circles)
                    {
                        for(var x = 0; x <  vm.children.length; x++)
                        {
                            if(index == vm.children[x])
                            {
                                acl.circles[index].circles.push(vm.circle.name);
                                $scope.update({name: acl.circles[index].name, parents: acl.circles[index].circles});    
                            }
                        }
                    }

                    vm.availableCircles.push(circle.name);
               
                    vm.circle = {};
                    vm.addingCircle = false;
                    loadCircles();
                });
            }, function(err) 
            {
                alert('Cannot save the circle');
            });
        };

        $scope.update = function(aCircle) 
        {   
            console.log('update');
            console.log(aCircle);
            var circle = new Circles({name: aCircle.name, circles: aCircle.parents});
            circle.$update();
        };
    }
]);;
