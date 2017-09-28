'use strict';

var Instrument = function (id, sequence, sound) {

	var _sound = sound;

	var _beats = [];
	var _instrumentID = id;

	// Add initial beats
	addBeats(sequence);

	function addBeats(sequence) {
		for (var i = 0; i < sequence.length; i++) {
			_beats.push(new Beat());

			if (sequence[i] == "1")
				_beats[i].activate();
		}
	}

	function reset() {
		for (var i = 0; i < _beats.length; i++) {
			_beats[i].deactivate();
		}
	}

	function playSound(index) {
		if (_beats[index].isActive()) {

			return _sound.play();
		}

		return false;
	}

	// Return public functions
	return {
		getSound: function () { return _sound; },
		getBeats: function () { return _beats; },
		addBeats: addBeats,
		reset: reset,
		playSound: playSound,

		toString: function () {
			var sequence = _beats.map(function (x) { return (x.isActive()) ? "1" : "0" }).join('');

			var obj = {
				sequence: sequence,
				id: _instrumentID,
				soundID: _sound.getID(),
				sound: {
					id: _sound.getID(),
					name: _sound.getName(),
					description: _sound.getDescrption(),
					audiofile: _sound.getAudiofile()
				}
			};

			return JSON.stringify(obj);
		}
	}
};
