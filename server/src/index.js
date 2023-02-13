const express = require('express');
const app = express();
const {PORT, CLIENT_URL} = require('./constants');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');

//import passport middleware
require('./middleware/passport-middleware')

//initialize middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials:true }))
app.use(passport.initialize());

//import routes
const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/profile')

//initialize routes
app.use('/api', authRoutes)
app.use('/api', profileRoutes)

//app Start
const appStart = () => {
  try {
    app.listen(PORT, () =>{
      console.log(`The app is running at http://localhost:${PORT}`);
    })
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

appStart();