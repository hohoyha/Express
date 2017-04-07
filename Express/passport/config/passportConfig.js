var passport = require('passport');

module.exports = function(app, db) {
    // deserializing.
    passport.serializeUser(function(user, cb) {
        cb(null, user.uid);
    });

    passport.deserializeUser(function(id, cb) {
        db.users.findById(id, function (err, user) {
            if (err) { return cb(err); }
            cb(null, user);
        });
    });

    app.use(passport.initialize());
    app.use(passport.session());

    return passport;
}