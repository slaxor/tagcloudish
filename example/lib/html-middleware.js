'use strict';
var fs = require('fs');
var jade = require('jade');
var async = require('async');
var _ = require('lodash');

var error;

var checkFileExistence = function(files, callback) {
  async.all(
    files,
    fs.exists,
    function(exist) {
      if (exist) {
        callback();
      } else {
        error(404);
      }
    });
};

var readFiles = function(keyFile, textFile, sendResult) {
  var viewData = {};

  async.auto({
    checkFileExistence: function(callback) {checkFileExistence([keyFile, textFile], callback); },

    fetchKeywords: ['checkFileExistence', function(callback) {
      fs.readFile(keyFile, function(err, data) {
        if (err) { error(500); }
        viewData.keywords = JSON.parse(data);
        callback();
      });
    }],

    fetchText: ['checkFileExistence', function(callback) {
      fs.readFile(textFile, function(err, data) {
        if (err) { error(500); }
        viewData.text = data;
        callback();
      });
    }]},

    function() {
      sendResult(viewData);
    }
  );
};

module.exports = function (appPath, options) {
  options = _.merge({
    template: appPath + '/web/index.jade',
    data: appPath + '/data'
  }, options);
  var page = jade.compileFile(options.template, {pretty: true});

  return function (req, res) {
    var keywordFileName = options.data + req.path + '-keywords.json';
    var textFileName = options.data + req.path + '.txt';
    //var viewData =
    error = function(code) {
      switch (code) {
        case 404:
          res.status(code).send('Document not found');
        break;
        case 500:
          res.status(code).send('Internal Server error');
        break;
      }
    };
    try {
      readFiles(keywordFileName, textFileName, function(viewData) {
        res.send(page(viewData));
      });
    } catch(err) {
      error(500);
    }
  };
};

