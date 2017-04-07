var express = require("express");
var route =   express.Router();
var GithubStrategy = require('passport-github').Strategy;
var git = 'git:';




module.exports = function(passport, db, path, Account){

    var updateUserdata = function(profile) {
        var user = {};
        user.uid = 0;
        user.displayName = profile.displayName;
        user.username = git + profile.username;
        return user;
    }

    passport.use(new GithubStrategy({
        clientID: "8e83092bf108dec08741",
        clientSecret: "7798f1f86b98a9e7049ce751a6c6ab09b55c77aa",
        callbackURL: "http://localhost:30000/auth/github/callback"
    },
        function(accessToken, refreshToken, profile, done) {
            // placeholder for translating profile into your own custom user object.
            // for now we will just use the profile object returned by GitHub
         Account.find({username: git + profile.username }, function(err, accounts ){
            if(!accounts[0]) 
            {
                var account = new Account();
                account.username = git + profile.username;
                account.password = '',
                account.displayName = profile.displayName;
              
                  account.save(function(err){
                        if(err){
                            console.error(err);
                            res.json({result: 0});
                            return;
                        }

                        user = updateUserdata(profile);
                        db.users.findOrCreate(user, function(err, data ){
                            return done(null, data);
                        });
                 });
            } else {
                user = updateUserdata(profile);
                db.users.findOrCreate(user, function(err, data ){
                    return done(null, data);
                });
            } 
        
            });
        }
    ));


    route.get('/', passport.authenticate('github'));

    // GitHub will call this URL
    route.get('/callback',
        passport.authenticate('github', { failureRedirect: '/auth/github' }),
        function(req, res) {
        res.redirect(path);
    });

    return route;
}