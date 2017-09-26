'use strict';

//var app = angular.module('AngularDrumMachine', ['ngRoute']);
var app = angular.module('AngularDrumMachine', []);

app.run(['drumMachine', '$q', '$rootScope', '$timeout', function (drumMachine, $q, $rootScope, $timeout) {
	$rootScope.loading = true;

	drumMachine.loadMachine(1).then(function (result) {
		$rootScope.machine = drumMachine;
		$rootScope.tempo = drumMachine.tempo.call(this);
		$rootScope.loading = false;
	});

	//drumMachine.loadInstruments().then(function (result) {
	//	drumMachine.loadSequence().then(function (result) {
	//		$rootScope.machine = drumMachine;
	//		$rootScope.tempo = drumMachine.tempo.call(this);
	//		$rootScope.loading = false;
	//	});
	//});
}]);
