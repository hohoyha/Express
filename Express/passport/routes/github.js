var express = require("express");
var route =   express.Router();
var GithubStrategy = require('passport-github').Strategy;

module.exports = function(passport, db, path){

    passport.use(new GithubStrategy({
        clientID: "8e83092bf108dec08741",
        clientSecret: "7798f1f86b98a9e7049ce751a6c6ab09b55c77aa",
        callbackURL: "http://localhost:30000/auth/github/callback"
    },
        function(accessToken, refreshToken, profile, done) {
            // placeholder for translating profile into your own custom user object.
            // for now we will just use the profile object returned by GitHub
            
            var user = {};
            user.id = profile.id;
            user.displayName = profile.displayName;
            user.username = profile.username;
            db.users.findOrCreate(user);
            return done(null, user);
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