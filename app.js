var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var apiRouter = require('./routes/api');
var tripsRouter = require('./routes/api/trips');

var app = express();

const cors = require('cors') // add at the top

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);
app.use('/api/trips', tripsRouter);
app.use('/api/places', placesRouter);
app.use('/api/users', usersRouter);


app.use(cors()); // add after 'app' is created


module.exports = app;
