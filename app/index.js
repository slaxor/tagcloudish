'use strict';
var parseInputText = function (text, keyWords) {
  var result = {};
  text = text.replace(/\s+/g, ' ');
  var re = new RegExp(' (' + keyWords.join('|') + ') ', 'g');
  var wordList = text.match(re);
  var weight = 1 / wordList.length;

  wordList.forEach(function (word, index) {
    word = word.replace(/\s/g, '');
    if (typeof result[word] === 'undefined') {
      result[word] = {weight: weight, age: weight * index};
    } else {
      result[word].weight += weight;
    }
  });

  return result;
};

var calculateWeightAndAgeClasses = function (weightAndAge) {
  // 100-30%, 30-15%, 15-5%, 5-0%
  //var ages = ['old', 'oldish', 'newish', 'new'];
  //var weights = ['small', 'smalish', 'bigish', 'big'];
  var ages = ['new', 'newish', 'oldish', 'old'];
  var weights = ['big', 'bigish', 'smallish', 'small'];
  var htmlClass;

  if (weightAndAge.weight > 0.30) {
    htmlClass = weights[0] + ' ';
  } else if (weightAndAge.weight > 0.15) {
    htmlClass = weights[1] + ' ';
  } else if (weightAndAge.weight > 0.05) {
    htmlClass = weights[2] + ' ';
  } else {
    htmlClass = weights[3] + ' ';
  }

  if (weightAndAge.age > 0.70) {
    htmlClass += ages[3];
  } else if (weightAndAge.age > 0.30) {
    htmlClass += ages[2];
  } else if (weightAndAge.age > 0.15) {
    htmlClass += ages[1];
  } else {
    htmlClass += ages[0];
  }

  return htmlClass;
};

var generateTagCloud = function (text, keyWords) {
  var result = '';
  var parsedText = parseInputText(text, keyWords);
  Object.keys(parsedText).forEach(function (key) {
    result += '<tagcloudtag class="' +
      calculateWeightAndAgeClasses(parsedText[key]) +
          '">' + key + '<tagcloudtag>\n';
  });

  return result;
};


module.exports = {
  parseInputText: parseInputText,
  generateTagCloud: generateTagCloud
};

