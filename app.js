const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('cookie-session');
require('dotenv').config()

const app = express();
const buildPath = path.join(__dirname, 'frontend/', 'dist');

app.set('views', path.join(buildPath, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(favicon(path.join(buildPath, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(buildPath));
app.use(expressSession({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.get('/', function (req, res) {
  res.sendFile(path.join(buildPath, 'index.html'));
});
app.get('/diary', function (req, res) {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.use('/api', require('./routes/index'));

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
