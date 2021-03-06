'use strict';

// drumMachine Model
app.factory('machineNav', function ($http, $q, timerQueue) {

	var _machines = [];

	function loadNav() {
		_machines = [];
		return $http.post("/Ajax/SavedMachines").then(function (response) {
			for (var i = 0, len = response.data.length; i < len; ++i){
				_machines.push(new MachineNavItem(response.data[i].id, response.data[i].name));
			}

			_machines.push(new MachineNavItem(0, "New Machine"));

			return "Nav Loaded";
		});
	}

	// Return public functions
	return {
		getMachines: function () { return _machines; },
		loadNav: loadNav

	}
});
