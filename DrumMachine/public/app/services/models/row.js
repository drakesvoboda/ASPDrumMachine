'use strict';

var Row = function (instrument, initialBeats) {
	var instrument = instrument;
	var beats = [];
	var machineID;

	// Add initial beats
	addBeats(initialBeats);

	function getInstrument() {
		return instrument;
	}

	function getBeats() {
		return beats;
	}

	function addBeats(num) {
		for (var i = 0; i < num; i++) {
			beats.push(new Beat());
		}
	}

	function reset() {
		for (var i = 0; i < beats.length; i++) {
			beats[i].deactivate();
		}
	}

	function playSound(index) {
		if (beats[index].isActive()) {
			return instrument.play();
		}
		return false;
	}

	function saveRow(machineID, $http) {
		this.machineID = machineID;
		return $http.post("/Ajax/SaveRow", this).then(function (response) {
			console.log(response);
			rowID = response.data.id;
			return "Row Saved";
		});
	}

	// Return public functions
	return {
		getInstrument: getInstrument,
		getBeats: getBeats,
		addBeats: addBeats,
		reset: reset,
		playSound: playSound,
		saveRow: saveRow
	}
};
