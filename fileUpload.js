var fileUpload = {
	readFile: function (file) {
		var reader = new FileReader();

		reader.readAsText(file, "UTF-8");

		reader.onload = function (e) {
			console.log('loaded');
			var result = e.target.result;
			var utterance = searcher.searchForSentencesWithStructures(result, [
					"CLUE",
					"WARNING",
					"TIP",
					"FORTUNE",
					"OMEN",
					"PROPHECY",
					"AUGURY",
					"PORTENT",
					"PREMONITION",
					"LUCKY NUMBERS"
			]);
			$('#result').html(fileUpload.translateUtteranceToText(utterance));
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
	},
	translateUtteranceToText : function (utterance) {
		var utterances = [];
		_.keys(utterance).forEach(function (sentenceType) {
			if (utterance[sentenceType]) {
				utterances.push("<p class='result-sentence'>" + sentenceType + ": " + utterance[sentenceType] + "</p>");
			}
		})
		return utterances.join('<br>');
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