'use strict';

angular.module('mean.companyadmin').controller('CompanyThemesController', ['$scope', 'Global', '$rootScope', '$http',
    function($scope, Global, $rootScope, $http) {
        $scope.global = Global;
        $scope.themes = [];

        $scope.init = function() {
            $http({
                method: 'GET',
                url: 'http://api.bootswatch.com/3/',
                skipAuthorization: true
            }).
            success(function(data, status, headers, config) {
                $scope.themes = data.themes;
            }).
            error(function(data, status, headers, config) {

            });
        };

        $scope.changeTheme = function(theme) {
            // Will add preview options soon 
            // $('link').attr('href', theme.css);
            // $scope.selectedTheme = theme;
            $('.progress-striped').show();

            $http.get('/api/admin/themes?theme=' + theme.css).
            success(function(data, status, headers, config) {
                if (data)
                    window.location.reload();
            }).
            error(function(data, status, headers, config) {
                alert('error');
                $('.progress-striped').hide();

            });
        };

        $scope.defaultTheme = function() {
            $http.get('/api/admin/themes/defaultTheme').
            success(function(data, status, headers, config) {
                if (data)
                    window.location.reload();
            }).
            error(function(data, status, headers, config) {
                alert('error');
            });
        };
    }
]);
