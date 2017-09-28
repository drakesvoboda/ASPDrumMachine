'use strict';

//var app = angular.module('AngularDrumMachine', ['ngRoute']);
var app = angular.module('AngularDrumMachine', []);

app.run(['drumMachine', 'machineNav', '$q', '$rootScope', '$timeout', function (drumMachine, machineNav, $q, $rootScope, $timeout) {
	$rootScope.loading = true;

	drumMachine.loadMachine(1).then(function (result) {
		$rootScope.machine = drumMachine;
		$rootScope.tempo = drumMachine.tempo.call(this);
		$rootScope.loading = false;
	});

	machineNav.loadNav().then(function (result) {
		$rootScope.machineNav = machineNav;
	})


}]);
