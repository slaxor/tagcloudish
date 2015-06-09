'use strict';
var Chai = require('chai');
var fs = require('fs');
var Lab = require('lab');
var lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Chai.expect;
var app = require('../app/index');

var keyWords = ['bigishNew', 'smallishNew', 'smallishNewish', 'smallOldish', 'bigOldish', 'smallOld'];
var inputText = fs.readFileSync('./test/fixtures/sample_text.txt').toString();


describe('Parse input text:', function () {
    it('counts words in a given text', function (done) {
      var result = app.parseInputText(inputText, keyWords);
      expect(result.bigishNew.weight).to.equal(0.24444444444444446);
      expect(result.bigOldish.weight).to.equal(0.5777777777777776);
      done();
    });

    it('calculates the age of the earliest appearance', function (done) {
      var result = app.parseInputText(inputText, keyWords);
      expect(result.bigishNew.age).to.equal(0);
      expect(result.bigOldish.age).to.equal(0.4);
      done();
    });
});

describe('Generate tags', function () {
    it('', function (done) {
      var result = app.generateTagCloud(inputText, keyWords);
      expect(result).to.have.string('<tagcloudtag class="bigish new">bigishNew<tagcloudtag>');
      done();
    });
});


 exports.lab = lab;
