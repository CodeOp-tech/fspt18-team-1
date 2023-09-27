var express = require('express');
const cors = require('cors') // add at the top
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var apiRouter = require('./routes/api');
var usersRouter = require('./routes/users');
var tripsRouter = require('./routes/trips');
var placesRouter = require('./routes/places');

var app = express();
app.use(cors()); // add after 'app' is created


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);
app.use('/api/users', usersRouter);
app.use('/api/trips', tripsRouter);
app.use('/api/places', placesRouter);


module.exports = app;
