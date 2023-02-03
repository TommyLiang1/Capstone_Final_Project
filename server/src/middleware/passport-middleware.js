const passport = require('passport');
const { Strategy } = require('passport-jwt');
const { SECRET } = require('../constants');
const db = require('../db/db')

const cookieExtractor = function(req) {
  let token = null
  if(req && req.cookies) token = req.cookies['token']
    return token
}

const opts = {
  secretOrKey: SECRET,
  jwtFromRequest: cookieExtractor,
}

passport.use(
  new Strategy(opts, async ({id}, done) => {
    try {
      const {rows} = await db.query(
        'SELECT user_id, user_id FROM users where user_id = $1',
        [id]
      )

      if(!rows.length) {
        throw new Error('401 not authorized')
      }
      let user = { id: rows[0].user_id, email: rows[0].user_email }

      return await done(null, user)
    } catch (err) {
      console.log(err.message)
      done(null, false)
    }
  })
)