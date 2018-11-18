var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');

var app = express();

//View engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);

//Catch 404 and error
app.use(function(req, res, next){
  next(createError(404));
});

//erro handler
app.use(function(err, req, res, next){
    //set locals, only prov error in devop
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    //render error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;