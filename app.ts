const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('cookie-session');
const createError = require("http-errors");
require('dotenv').config()

const app = express();
const buildPath = path.join(__dirname, 'frontend/', 'dist');

app.set('views', path.join(buildPath, 'views'));
app.set('view engine', 'html');

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

app.get('/', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});
app.get('/diary', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.use('/api', require('./routes/index'));

app.use((req, res, next) => {
  const err = createError(404);
  next(err);
});

app.use((err, req, res) => {
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
