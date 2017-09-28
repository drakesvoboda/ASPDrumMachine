'use-strict';

app.directive("fileread", [function () {
	return {
		scope: {
			fileread: "="
		},
		link: function (scope, element, attributes) {
			element.bind("change", function (changeEvent) {
				var reader = new FileReader();
				reader.onload = function (loadEvent) {
					scope.$apply(function () {
						scope.fileread = {data:loadEvent.target.result, name: changeEvent.target.files[0].name };
					
					});
				};
				
				reader.readAsDataURL(changeEvent.target.files[0]);
			});
		}
	};
}]);