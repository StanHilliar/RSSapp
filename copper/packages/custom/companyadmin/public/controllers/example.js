'use strict';

angular.module('mean.companyadmin').controller('CompanyExampleController', ['$scope', 'Global', 'CompanyModuleSettings',
	function($scope, Global, ModuleSettings) {
		var vm = this;

		ModuleSettings.get('admin').then(function(data) {
			vm.app = data;
		}, function(err) {
			console.log('err', err);
		});

		vm.save = function() {
			ModuleSettings.update('admin', {example: 'example', name: vm.app.name}).then(function(data) {
          alert('Settings saved to admin module');
			}, function(err) {
				console.log('err', err);
			});
		};
	}
]);