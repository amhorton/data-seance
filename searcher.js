var datacomb = require('./datacomb.json');
var _ = require('./lib/underscore');


searcher = {
	searchForWord : function (text, wordToFind) {
		//returns location of word by index of last letter, returns false if
		//word is not found
		var wordToFind = wordToFind || "ghost";
		var wordArr = wordToFind.split("");
		var found = true;
		var workingString = text;
		var lastLetterIndex;
		var actualIndex = 0;
		return wordArr.every(function (char, letterIndex) {
			workingStringIndex = workingString.indexOf(char);
			if (workingStringIndex < 0) {
				return false;
			} else {
				actualIndex += workingStringIndex + 1;
				workingString = workingString.slice(workingStringIndex + 1);
				return true;
			}
		}) && actualIndex - 1;
	},
	searchForWords : function (text, wordsToFind) {
		var foundWords = [];
		wordsToFind.forEach(function (word) {
			if (searcher.searchForWord(text, word)) {
				foundWords.push(word);
			}
		});
		return foundWords;
	},
	countWordsInText : function (text, wordsToCount) {
		var wordCounts = {};
		var count;
		var firstChar;
		wordsToCount.forEach(function (word) {
			wordCounts[word] = 0;
			firstChar = word[0];
			textArr = text.split("")
			textArr.forEach(function (char, index) {
				if (char === firstChar && searcher.searchForWord(text.slice(index), word)) {
					wordCounts[word] ++
				}
			});
		});
		return wordCounts;
	},
	findSentence : function (text) {
		//basic form: object, preposition, location
		var objects = datacomb.objects;
		var prepositions = datacomb.prepositions;
		var places = datacomb.places;
		var sentence = [];
		var firstObject = searcher.findFirstWordOfType(text, objects);
		var firstPrep;
		var firstPlace;
		var actualIndex = 0;
		if (!firstObject) {
			return false
		}
		sentence.push(firstObject.word.toUpperCase());
		actualIndex += firstObject.index + 1;
		console.log(text.slice(actualIndex));
		firstPrep = searcher.findFirstWordOfType(text.slice(actualIndex), prepositions);
		if (!firstPrep) {
			return false;
		}
		sentence.push(firstPrep.word.toUpperCase());
		actualIndex += firstPrep.index + 1;
		console.log(text.slice(actualIndex));
		firstPlace = searcher.findFirstWordOfType(text.slice(actualIndex), places);
		if (!firstPlace) {
			return false;
		}
		sentence.push(firstPlace.word.toUpperCase());
		return sentence.join(' ');

	},
	findFirstWordOfType : function (text, wordsToFind) {
		//finds first word of given type
		//return object with that word and its index
		var foundWords = {};
		var firstIndex = text.length + 1;
		var firstWord;
		wordsToFind.forEach(function (word) {
			var foundAt = searcher.searchForWord(text, word);
			if (foundAt) {
				foundWords[word] = foundAt;
			}
		});
		if (_.isEmpty(foundWords)) {
			return false;
		}
		_.keys(foundWords).forEach(function (word) {
			if (foundWords[word] < firstIndex) {
				firstIndex = foundWords[word];
				firstWord = word;
			}
		});
		return {
			word : firstWord,
			index : firstIndex
		};
	}
};
