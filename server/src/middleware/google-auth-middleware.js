// // DOESN'T WORK YET...
// const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = require('../constants');
// const passport = require('passport');

// var GoogleStrategy = require('passport-google-oauth2').Strategy;

// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientsECRETE: GOOGLE_CLIENT_SECRET,
//     callbackURL: "htttp://localhost:3000/login",
//     passReqToCallback: true
//   },
//   function(request, accessToken, refreshToken, profile, done) {
//       return done(err, profile);
//   }
// ));

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });