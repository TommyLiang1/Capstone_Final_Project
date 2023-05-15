const db = require('../db/db');
const {hash} = require('bcryptjs');
const {sign} = require('jsonwebtoken');
const {SECRET} = require('../constants');

exports.getUsers = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT user_id, user_name, user_email FROM users');

    return res.status(200).json({
      success: true,
      users: rows,
    })
  } catch (err) {
    console.log(err.message);
  }
}

exports.getUserById = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT user_id, user_name, user_email FROM users WHERE user_id = $1', [req.params.id]);

    return res.status(200).json({
      success: true,
      user: rows,
    })
  } catch (err) {
    console.log(err.message);
  }
}

exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const { rows } = await db.query('SELECT user_id, user_name, user_email FROM users WHERE user_email = $1', [email]);

    return res.status(200).json({
      success: true,
      user: rows,
    })
  } catch (err) {
    console.log(err.message);
  }
}

exports.register = async (req, res) => {
  const {username, email, password} = req.body;
  try {
    const hashedPassword = await hash(password, 10)

    await db.query(
      'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3)',
      [username, email, hashedPassword]
    )

    return res.status(201).json({
      success: true,
      message: "Registered successfully"
    })
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({
      error: err.message,
    })
  }
}

exports.login = async (req, res) => {
  let user = req.user
  let payload = {
    id: user.user_id,
    email: user.user_email,
  }

  try {
    const token = await sign(payload, SECRET)

    return res.status(200).cookie('token', token, { httpOnly: true }).json({      
      success: true,
      message: 'Logged in successfully',
      user: user,
    })
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({
      error: err.message,
    })
  }
}

exports.googleLogin = async (req, res) => {
  const { name, email, picture } = req.body;
  try {
    //check if email already exists
    const user = await db.query(
      'SELECT * FROM users WHERE user_email = $1', 
      [email]
    )

    if(user.rows.length) {
      //link google account to current user?
    }
    else {
      console.log('Creating profile for google user')
      // await db.query(
      //   'INSERT INTO profiles (profile_name, profile_email, img) VALUES ($1, $2, $3)', 
      //   [name, email, picture]
      // )
    }
    
    return res.status(201).json({
      success: true,
      message: "Logged in with Google successfully"
    })
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({
      error: err.message,
    })
  }
}

exports.protected = async (req, res) => {
  try {
    return res.status(200).json({
      info: req.user.id,
    })
  } catch (err) {
    console.log(err.message);
  }
}

exports.logout = async (req, res) => {
  try {  
    return res.status(200).clearCookie('token', { httpOnly: true }).json({      
      success: true,
      message: 'Logged out successfully',
    })
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({
      error: err.message,
    })
  }
}