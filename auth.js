var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
user = { // This a hard-coded user
    _id: 1,
    username: 'CHC',
    email: 'john@doe.com',
    password: 'CHCL33t'
};

// Register a login strategy
passport.use('login', new LocalStrategy(
    function(username, password, done) {
        // This should check again db
        console.log("check")
        console.log(username)
        if(username === user.username && password === user.password) {
            return done(null, user);
        }
        else {
            done(null, false, { message: 'Invalid username and password.' });
        }
    }
));

// Required for storing user info into session 
passport.serializeUser(function(user, done) {
    console.log("serialize")
    console.log(user);
  done(null, user._id);
});

// Required for retrieving user from session
passport.deserializeUser(function(id, done) {
    console.log("deserialize")
    console.log(id);
  // The user should be queried against db
  // using the id
  done(null, user);
});

module.exports = passport;