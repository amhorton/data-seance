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