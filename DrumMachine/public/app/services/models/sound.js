'use strict';

var Sound = function (name, description, audiofile, player) {

	var audioPlayer = audioPlayer;

	var _name = name;
	var _description = description;
	var _audiofile = audiofile;


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
		play: play
	}
};
