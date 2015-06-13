'use strict';
var _ = require('lodash');

var parseInputText = function (text, keyWords) {
  var result = {};
  text = text.replace(/\s+/g, ' ');
  var re = new RegExp(' (' + keyWords.join('|') + ') ', 'gi');
  var wordList = text.match(re);
  var weight = 1 / wordList.length;
  var maxWeight;

  wordList.forEach(function (word, index) {
    word = word.replace(/\s/g, '');
    if (typeof result[word] === 'undefined') {
      result[word] = {weight: weight, age: weight * index};
    } else {
      result[word].weight += weight;
    }
  });

  // this normalises the weight so the the max value is always 1
  maxWeight = Math.max.apply(null, _.map(result, function (val) {
    return val.weight;
  }));
  Object.keys(result).forEach(function (key) {
    result[key].weight *= 1 / maxWeight;
  });

  return result;
};

var calculateWeightAndAgeClasses = function (weightAndAge) {

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
    result += '<slaxor-tagcloud-tag class="' +
      calculateWeightAndAgeClasses(parsedText[key]) +
      '" data-weight="' + parsedText[key].weight +
      '" data-age="' + parsedText[key].age + '">' +
      key + '</slaxor-tagcloud-tag>\n';
  });
  result += '<div class="credit">created with <a href="https://github.com/slaxor/tagcloudish">tagcloudish<a/></div>';
  return result;
};


module.exports = {
  parseInputText: parseInputText,
  generateTagCloud: generateTagCloud
};

