var express = require("express");
var route =   express.Router();
var Strategy = require('passport-local').Strategy;

module.exports = function(passport, db, path){
 
// Configure the local strategy for use by Passport.
//
passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

  route.use(function(req, res, next){
        console.log("auth//");
        next();
  });

        // Define routes.
  route.get('/',
    function(req, res) {
        res.render('home', { user: req.user });

        if(req.isAuthenticated() ) {
            console.log("login succeed.");
        }
    });

  route.get('/logout',
    function(req, res){
        req.logout();
        res.redirect(path);
    });

    route.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res){
        res.render('profile', { user: req.user });
    });

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect(path);
    }

    route.get('/protected', ensureAuthenticated, function(req, res) {
        res.send("acess granted");
    });


  route.get('/login',
    function(req, res){
        res.render('login');
  });

  route.post('/login', 
    passport.authenticate('local', { failureRedirect: path + '/login' }),
    function(req, res) {
        res.redirect(path);
  });

   return route;
};