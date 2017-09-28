'use strict';

var MachineNavItem = function (id, name) {
	var _machineID = id;
	var _name = name;

	// Return public functions
	return {
		getID: function () { return _machineID; },
		getName: function () { return _name; }
	}
};
