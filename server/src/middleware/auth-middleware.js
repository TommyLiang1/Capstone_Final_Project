const passport = require('passport');

exports.userAuth = passport.authenticate(['jwt'], {session: false})

//exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email']})