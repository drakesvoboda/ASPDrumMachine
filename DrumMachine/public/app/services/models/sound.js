'use strict';

var Sound = function (id, name, description, audiofile, player) {

	var audioPlayer = player;

	var _name = name;
	var _description = description;
	var _audiofile = audiofile;
	var _soundID = id;

	function play() {
		try {
			audioPlayer.play();
			return true;
		} catch (e) {
			console.log("Unable to play sound", e);
			return false;
		}
	};

	// Return public functions
	return {
		getName: function () { return _name; },
		getDescrption: function () { return _description; },
		getAudiofile: function () { return _audiofile; },
		getID: function () { return _soundID; },
		play: play
	}
};
