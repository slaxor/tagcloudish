'use strict';
var path = require('path');
var html = require('./lib/html-middleware');
var less = require('less-middleware');
var browserify = require('browserify-middleware');
var express = require('express');
var app = express();

var documentRoot = path.join(__dirname, 'web');

app.get('/javascripts/application.js', browserify(documentRoot + '/javascripts/main.js'));
app.use('/stylesheets', less(documentRoot + '/stylesheets'));
app.use('/stylesheets', express.static(documentRoot + '/stylesheets'));
app.use('/assets', express.static(documentRoot + '/assets'));
app.use('/', html(__dirname));

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

module.exports = app;

