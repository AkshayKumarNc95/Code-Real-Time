"use strict";

var express = require('express');

var createError = require('http-errors');

var path = require('path');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

var app = express(); // Custom

var indexRouter = require('./src/routes/index');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser()); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.end('error - ' + err.message);
});
module.exports = app;