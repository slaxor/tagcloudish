'use strict';
var path = require('path');
var fs = require('fs');
var jade = require('jade');
var less = require('less-middleware');
var browserify = require('browserify-middleware');
var express = require('express');
var app = express();

var documentRoot = path.join(__dirname, 'web');

app.get('/', function (req, res) {
  var viewData = {
    keyWords: [
      'kaiser', 'gut', 'wohl', 'liebe', 'seele', 'deutsche', 'volk', 'einst',
      'franzosen', 'deutschen', 'vater', 'mutter', 'leben', 'sonne', 'menschen',
      'lied', 'essen', 'deutschland', 'stadt', 'pferde', 'nacht', 'mann', 'lieben',
      'himmel', 'herz', 'haupt', 'hamburg', 'zeit', 'kopf', 'herzen', 'herr', 'hand',
      'gedanken', 'freien', 'brust', 'beil', 'augen', 'zukunft', 'welt', 'verleger',
      'vaterland', 'trinken', 'schweigen', 'schwaben', 'rotbart', 'rede', 'heil',
      'gute ', 'gleich', 'genug', 'freund', 'fahne', 'erde', '', 'wenig', 'vergebens',
      'sprechen', 'rheinwein', 'recht', 'neuen', 'neue', 'luft', 'liebes', 'lieb', 'lange',
      'land', 'kind', 'freiheit', 'frau', 'fisch', 'erden', 'dichter', 'campe', 'besser',
      'armen', 'alter', 'aachen', 'zensur', 'wort', 'willkommen', 'wesen', 'wald', 'waffen',
      'vogel', 'vergangenheit', 'traurig', 'tausend', 'stuhl', 'sterne', 'springen', 'soldaten',
      'singen', 'schlafen', 'ruhig', 'reden', 'paris', 'lust', 'leute', 'hoffmann', 'hermann',
      'heimlich', 'haus', 'gassen', 'freude', 'fleisch', 'flammen', 'fest', 'apfelsinen',
      'einheit', 'eichen', 'dumme', 'denk', 'wasser', 'wein', 'weib', 'vorzeit', 'witze',
      'patriotismus', 'jungfer', 'juden', 'hamburgs', 'guillotinieren', 'frankreich', 'esel',
      'deutschlands', 'deutscher', 'deutsch', 'danke', 'wirklichkeit', 'westfalen', 'wirtshaus',
      'tagespresse', 'reisen', 'pickelhaube', 'pferdekopf', 'ochsen', 'mondschein', 'moses'
    ],
    text: fs.readFileSync(path.join(__dirname, 'data') + '/Heinrich_Heine-Deutschland-Ein-Wintermaerchen.txt').toString()
  };
  var page = jade.compileFile(documentRoot + '/index.jade', {pretty: true});
  console.log(page);
  res.send(page(viewData));
});
app.get('/javascripts/application.js', browserify(documentRoot + '/javascripts/main.js'));
app.use('/stylesheets', less(documentRoot + '/stylesheets'));
app.use('/stylesheets', express.static(documentRoot + '/stylesheets'));

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});


















/*

var express = require('express');
var path = require('path');
var fs = require('fs');
var jade = require('jade');
var logger = require('morgan');
//var debug = require('debug')('example:server');


var app = express();
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));

app.get('/', function (err, req, res) {
  var viewData = {
    keyWords:  ['bigishNew', 'smallishNew', 'smallishNewish', 'smallOldish', 'bigOldish', 'smallOld'],
    text: fs.readFileSync(path.join(__dirname, '..', 'test', 'fixtures') + '/sample_text.txt').toString()
  };
  //console.debug('rendering ', path.join(__dirname, 'views') + '/index.jade', 'with ', viewData);
  var page = jade.compileFile(path.join(__dirname, 'views') + '/index.jade', {pretty: true});
  console.log(page);
  res.render(page(viewData));
});

app.listen();




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
*/

module.exports = app;
