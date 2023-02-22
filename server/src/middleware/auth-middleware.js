const passport = require('passport');

exports.userAuth = passport.authenticate(['jwt', 'passport-google-auth'], {session: false})

//exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email']})