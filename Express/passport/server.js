var express = require('express');

var db = require('./db');

// Create a new Express application.
var app = express();
// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
var passport = require('./config/passportConfig')(app, db);

var path = '/auth';
var local = require('./routes/local')(passport, db, path);
app.use(path, local);

var github = require('./routes/github')(passport, db, path);
app.use('/auth/github', github);


app.listen(30000);
