var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var cors = require('cors');
var passport = require('passport');
//middlware

//pasport setup
require('./config/passport')(passport);

const AuthMiddleWare = require("./middleware/AuthMiddleware");
//route
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
// var googleRouter = require('./auth/routes');
//mogon
var mongodb = require('./mongo');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//run mongo
mongodb
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))


app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/good');
    }
);

app.use('/login', loginRouter);
app.use('/', indexRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
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