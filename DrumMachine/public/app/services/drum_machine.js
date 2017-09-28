'use strict';

// drumMachine Model
app.factory('drumMachine', function ($http, $q, timerQueue) {
	// Private variables
	var _playing = false;
	var _currentBeat = 0;
	var _delay = 100;
	var _gridLength = 16;
	var _tempo = 120;
	var _timers = timerQueue;
	var _rows = [];
	var _name = "New Machine";
	var _machineID = 0;

	function loadMachine(machineID) {

		_machineID = machineID;
		_rows = [];


		if (_machineID == 0) {
			_tempo = 120;
			_delay = 100;
			_gridLength = 16;
			_name = "New Machine";
			var dfd = $q.defer();
			dfd.resolve();
			return dfd.promise;
		}

		return $http.post("/Ajax/Machine", { machineID: machineID }).then(function (response) {
			_gridLength = response.data.gridLength;
			_name = response.data.name;
			_tempo = response.data.tempo;

			setTempo(response.data.tempo);

			for (var i = 0, len = response.data.instruments.length; i < len; ++i) {
				var json = response.data.instruments[i];

				var player = new Howl({ urls: ["/sounds/" + json.sound.audiofile] });
				var sound = new Sound(json.sound.id, json.sound.name, json.sound.description, json.sound.audiofile, player);

				_rows.push(new Instrument(json.id, json.sequence, sound));
			}

			return "Machine Loaded";
		});

	}

	function saveMachine() {
		return $http.post("/Ajax/SaveMachine", { machineID: _machineID, name: _name, gridLength: _gridLength, tempo: _tempo }).then(function (response) {

			_machineID = response.data.id;

			var json = [];

			for (var i = 0, len = _rows.length; i < len; ++i) {
				var row = _rows[i];
				json.push(row.toString());
			}

			$http.post("/Ajax/SaveGrid", {
				machineID: _machineID,
				data: "[" + json.toString() + "]"
			});
		});
	}

	function addNewRow(newRow) {
		var player = new Howl({ urls: [newRow.file.data] });
		var sound = new Sound(0, newRow.name, "", newRow.file.name, player);

		_rows.push(new Instrument(0, Array(_gridLength + 1).join("0"), sound));
	}

	function rows() {
		return _rows;
	}

	function tempo() {
		return _tempo;
	}

	function gridLength() {
		return _gridLength;
	}

	function currentBeat() {
		return _currentBeat;
	}

	function setTempo(newTempo) {
		_tempo = newTempo;
		_delay = beatDelay();
	}

	function play() {
		_playing = true;
		_timers.add(playBeat(), beatDelay());
	}

	function stop() {
		_playing = false;
		_timers.clear();
	}

	function reset() {
		stop();
		_currentBeat = 0;
		resetAllRows();
	}

	// Benchmark Code
	//var lastTime = new Date().getTime();
	function playBeat() {
		return function () {
			//var thisTime = new Date().getTime();
			//console.log("Delay: " + _delay + " Diff: " + (thisTime - lastTime));
			//lastTime = thisTime;
			if (_currentBeat >= _gridLength) {
				_currentBeat = 0;
			}

			for (var i = 0; i < _rows.length; i++) {
				_rows[i].playSound(_currentBeat);
			}

			_currentBeat += 1;
			_timers.add(playBeat(), _delay);
		};
	}

	function resetAllRows() {
		for (var i = 0; i < _rows.length; i++) {
			_rows[i].reset();
		}
	}

	function beatDelay() {
		return (1000 / (_tempo * 2) * 60);
	}

	// Return public functions
	return {
		loadMachine: loadMachine,
		gridLength: gridLength,
		currentBeat: currentBeat,
		rows: rows,
		tempo: tempo,
		setTempo: setTempo,
		play: play,
		stop: stop,
		reset: reset,
		addNewRow: addNewRow,
		saveMachine: saveMachine,
		setName: function (name) { _name = name; },
		getName: function () { return _name; }
	}
});
