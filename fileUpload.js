var fileUpload = {
	readFile: function (file) {
		var reader = new FileReader();

		reader.readAsText(file, "UTF-8");

		reader.onload = function (e) {
			var utterance = searcher.search(e.target.result);
			$('#result').text(utterance);
		}
	}
}

$(document).ready(function () {
	$('#form').submit(function (e) {
		var file = document.getElementById('file').files[0];

		if (file) {
			fileUpload.readFile(file);
		} else {
			console.log("Where's the file???");
		}

		// keep the browser from reloading
		e.preventDefault();
	});
});