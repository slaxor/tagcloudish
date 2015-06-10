'use strict';
var app = require('../../../app/index');
//console.log(app);

var proto = Object.create(HTMLElement.prototype);

proto.createdCallback = function() {
  this.rendered = false;
  this.keywords = [];

  var keywordList = this.getElementsByTagName('slaxor-tagcloud-keyword');
  for (var i = 0; i < keywordList.length; i++) {
    console.log(keywordList[i]);
    this.keywords.push(keywordList[i].innerHTML);
  }

  this.text = this.getElementsByTagName('slaxor-tagcloud-text')[0].innerHTML;
  console.info('createdCallback() called', this);
};

proto.attachedCallback = function() {
  this.innerHTML = app.generateTagCloud(this.text, this.keywords);
  console.info('attachedCallback() called', this);
};

proto.detachedCallback = function() {
  console.info('detachedCallback() called', this);
};

proto.attributeChangedCallback = function(attributeName, oldValue, newValue) {
  console.info('attributeChangedCallback() called', this, attributeName, oldValue, newValue);
};

document.registerElement('slaxor-component-tagcloud', {
  prototype: proto
});
/*
  var body = document.getElementsByTagName('body')[0];
  var tc = new TagCloud();
  tc.innerHTML = 'foo bar';
  body.appendChild(tc);

  var mytc = document.getElementsByTagName('x-tagcloud')[0];
  mytc.keyWords
  mytc.getElementsByTagName('x-keyword').forEach(function(element) {
    mytc.keywords.push(element.innerHTML);
  });
*/

