var express = require("express");
var route =   express.Router();
var Strategy = require('passport-local').Strategy;



module.exports = function(passport, db, path, Account){
 

var updateUserdata = function(account) {
    var user = {};
    user.uid = 0;
    user.displayName = account.displayName;
    user.username = account.username;
    user.password = account.password;
    return user;
} 
// Configure the local strategy for use by Passport.
//
passport.use(new Strategy(
  function(username, password, cb) {
    Account.find({username: username }, function(err, accounts ){
        if(err) { return cb(err); }
        if (!accounts[0]) { return cb(null, false); }
        if (accounts[0].password != password) { return cb(null, false); }

        var user = updateUserdata(accounts[0]);
        db.users.findOrCreate(user, function(err, data ){
            return cb(null, data);
        });   

         // db.users.addUser(accounts[0]);
         //return cb(null, accounts[0]);
    });
  }));

  route.use(function(req, res, next){
        console.log("auth//");
        next();
  });

        // Define routes.
  route.get('/',
    function(req, res) {
        res.render('index', { messages:null, user: req.user});

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

  route.get('/register', 
    function(req, res){
        res.render('register');
  });

  route.post('/register', function(req, res, next) {
       
        Account.find({username: req.body.username }, function(err, accounts ){
            if(!accounts[0]) 
            {
                var account = new Account();
                account.username = req.body.username;
                account.password = req.body.password;
                account.displayName = req.body.displayName;
              
                account.save(function(err){
                    if(err){
                        console.error(err);
                        res.json({result: 0});
                        return;
                    }

                var user = updateUserdata(account);
                db.users.findOrCreate(user, function(err, data ){
                    // return cb(null, data);
                    req.login(data, function(err){
                    req.session.save(function(){
                            res.redirect(path);  
                        });
                    });      
                });   
                   
                });
            }
            else
            {
                res.redirect(path + '/register');
            }
        });
  });


   return route;
};