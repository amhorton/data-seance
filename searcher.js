searcher = {
	search : function (text, wordToFind) {
		var wordToFind = wordToFind || "ghost";
		var wordArr = wordToFind.split("");
		var found = true;
		var workingString = text;
		var index;
		wordArr.forEach(function (char) {
			console.log('searching in string ', workingString, ' for ', char);
			if (!found) {
				return;
			}
			index = workingString.indexOf(char);
			if (index < 0) {
				found = false
				console.log('did not find ', char);
			} else {
				workingString = workingString.slice(index + 1);
				console.log('found ', char, ' at ', index, '. new workingString: ', workingString);
			}
		});

		return found
	},
	searchForLetter : function (text, letter) {
		text = text || 'spooky ghost';
		return text.indexOf(letter);
	}
};

console.log(searcher.search('grandma has over stated trees'));