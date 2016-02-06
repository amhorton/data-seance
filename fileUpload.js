var fileUpload = {
	readFile: function (file) {
		var reader = new FileReader();

		reader.readAsText(file, "UTF-8");

		reader.onload = function (e) {
			console.log('loaded');
			var result = e.target.result;
			// var utterance = searcher.searchForSentencesWithStructures(result, [
			// 		"CLUE",
			// 		"WARNING",
			// 		"PROPHECY"
			// ]);
			var utterance = searcher.findSpookQuotient(result);
			console.log(utterance);
			$('#result').text(utterance);

			// number of spooky words divided by total words
			var spookyWords = utterance.spookCount,
				totalWords = utterance.totalCount,
				spookyRatio = (spookyWords / totalWords) * 10;

			var rating = document.getElementById('rating'),
				percentage = document.getElementById('percentage'),
				ratingWidth = $(rating)[0].offsetWidth,
				newWidth = ratingWidth * (spookyRatio / 100);

			$(rating).removeClass('hide');
			$(rating).width(newWidth);
			$(percentage).text('Spooky levels at ' + Math.trunc(spookyRatio) + '%');
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