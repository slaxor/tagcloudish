'use strict';
var app = require('../../../app/index');
var proto = Object.create(HTMLElement.prototype);

proto.createdCallback = function() {
  this.rendered = false;
  this.keywords = [];

  var keywordList = this.getElementsByTagName('slaxor-tagcloud-keyword');
  for (var i = 0; i < keywordList.length; i++) {
    this.keywords.push(keywordList[i].innerHTML);
  }

  this.text = this.getElementsByTagName('slaxor-tagcloud-text')[0].innerHTML;
};

proto.attachedCallback = function() {
  this.innerHTML = app.generateTagCloud(this.text, this.keywords);
};

document.registerElement('slaxor-component-tagcloud', {
  prototype: proto
});

