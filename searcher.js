function () {
var datacomb = require('./datacomb.json');
var _ = require('./lib/underscore');
var sentenceStructures = [
	['objects', 'prepositions', 'places']
];


searcher = window.searcher = {
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
	findSentenceWithStructure : function (text, structure) {
		var arrays = [];
		var sentence = [];
		var actualIndex = 0;
		var firstOfType;

		structure.forEach(function (wordType) {
			arrays.push(datacomb[wordType]);
		})

		arrays.every(function (wordArray) {
			firstOfType = searcher.findFirstWordOfType(text.slice(actualIndex), wordArray);

			if (!firstOfType) {
				return false;
			}
			actualIndex += firstOfType.index + 1;
			sentence.push(firstOfType.word.toUpperCase());
			return true;
		});

		return sentence.length === structure.length && sentence.join(' ');
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
}();
