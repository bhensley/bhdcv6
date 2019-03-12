var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cacheControl = require('express-cache-control');
//var fs = require('fs');
//var https = require('https');

var app = express();
var cache = new cacheControl().middleware;

/*
// SSL
const privateKey = fs.readFileSync('/etc/letsencrypt/live/bobbyhensley.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/bobbyhensley.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/bobbyhensley.com/chain.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Use 80 in production
//app.set('port',80)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', cache("years", 1), function(req, res, next) {
  res.set({ 'Cache-Control': 'public, max-age=31536000'});
  //res.setHeader('Cache-Control', 'public, max-age=31536000');
  res.render('layout', { title: 'Bobby Hensley dot Com' });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
