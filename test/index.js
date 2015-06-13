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
      expect(result.smallOld.weight).to.equal(0.03448275862068965);
      expect(result.smallishNewish.weight).to.equal(0.10344827586206896);
      expect(result.bigishNew.weight).to.equal(0.17241379310344826);
      expect(result.bigOldish.weight).to.equal(1);
      done();
    });

    it('calculates the age of the earliest appearance', function (done) {
      var result = app.parseInputText(inputText, keyWords);
      expect(result.smallishNew.age).to.equal(0);
      expect(result.bigishNew.age).to.equal(0.06864988558352403);
      expect(result.bigOldish.age).to.equal(0.30205949656750575);
      done();
    });
});

describe('Generate tags', function () {
    it('should have a <slaxor-tagcloud-tag>', function (done) {
      var result = app.generateTagCloud(inputText, keyWords);
      expect(result).to.match(/<slaxor-tagcloud-tag.*>smallOldish<\/slaxor-tagcloud-tag>/);
      done();
    });
});


 exports.lab = lab;

