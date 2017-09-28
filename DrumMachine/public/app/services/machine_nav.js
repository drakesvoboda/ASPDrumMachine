'use strict';

// drumMachine Model
app.factory('machineNav', function ($http, $q, timerQueue) {

	var _machines = [];

	function loadNav() {
		return $http.post("/Ajax/SavedMachines").then(function (response) {
			for (var i = 0, len = response.data.length; i < len; ++i){
				_machines.push(new MachineNavItem(response.data.id, response.data.name));
			}
			return "Nav Loaded";
		});
	}

	// Return public functions
	return {
		getMachines: function () { return _machines; },
		loadNav: loadNav

	}
});
