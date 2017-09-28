'use strict';

var MachineNavItem = function (name, id) {
	var _machineID = id;
	var _name = name;

	// Return public functions
	return {
		getID: function () { return _machineID; },
		getName: function () { return _name; }
	}
};
