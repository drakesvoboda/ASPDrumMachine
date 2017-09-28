'use strict';

// Drum Controller
app.controller('DrumMachineCtrl', function ($scope) {
	//variable to prevent multiple playloops
	$scope.lock = false;

	// Start playback
	$scope.playLoop = function () {
		if (!$scope.lock) {
			$scope.machine.play();
			$scope.fade_msg_play = true;
			$scope.lock = true;
		}
	};

	// Halt playback
	$scope.stopLoop = function () {
		$scope.lock = false;
		$scope.machine.stop();
	};

	// Reset the machine to its original state
	$scope.resetLoop = function () {
		$scope.machine.reset();
	};

	// Update the tempo
	$scope.updateTempo = function () {
		$scope.machine.setTempo($scope.tempo);
	};

	$scope.setName = function (name) {
		$scope.machine.setName(name);
	};

	$scope.addNewRow = function (_newRow) {
		$scope.machine.addNewRow(_newRow);
	};

	$scope.selectMachine = function (id) {
		$scope.loading = true;

		$scope.machine.loadMachine(id).then(function (result) {
			$scope.loading = false;
		});
	}

	$scope.saveMachine = function () {
		$scope.machine.saveMachine().then(function () {
			$scope.machineNav.loadNav();
		});
		
	}

	$scope.EditBPM = function () {
		var bpmEdit = document.getElementById('bpmEdit');
		var bpm = document.getElementById('bpm');
		bpm.style.display = 'none';
		bpmEdit.style.display = 'inline-block';
	};

	$scope.CloseEdit = function () {
		bpm.style.display = 'inline-block';
		bpmEdit.style.display = 'none';
	};

});
