'use strict';

var Instrument = function (json) {


	var player = new Howl({ urls: ["/sounds/" + json.sound.audiofile] });

	var _sound = new Sound(json.name, json.description, json.audiofile, player);


	var _beats = [];
	var _instrumentID = json.id;

	// Add initial beats
	addBeats(json.sequence);

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
				sound: {
					name: _sound.getName(),
					description: _sound.getDescrption(),
					audiofile: _sound.getAudiofile()
				}
			};

			return JSON.stringify(obj);
		}
	}
};
