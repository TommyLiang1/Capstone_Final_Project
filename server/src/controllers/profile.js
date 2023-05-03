const db = require('../db/db');

exports.getProfile = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT user_id, user_name, user_email, img, city, bio, education, hobbies FROM users WHERE user_id = $1', [req.params.id]);

    return res.status(200).json({
      success: true,
      profile: rows,
    })
  } catch (err) {
    console.log(err.message);
  }
}

exports.editProfile = async (req, res) => {
  try {
    const {user_name, img, city, education, bio, hobby} = req.body;
    const oldUserName = await db.query('SELECT user_name FROM users WHERE user_id = $1', [req.params.id])
    const newUserName = user_name === '' ? oldUserName.rows[0].user_name : user_name
    
    const user = await db.query('SELECT user_id FROM users WHERE user_name = $1', [user_name])
    if(user.rows.length > 0) {
      return res.status(400).json({
        message: user_name + " already in use!"
      })
    }

    await db.query(
      'UPDATE comments SET comment_name = $1 WHERE comment_name = $2',
      [newUserName, oldUserName.rows[0].user_name]
    )

    await db.query(
      'UPDATE posts SET post_name = $1 WHERE post_name = $2',
      [newUserName, oldUserName.rows[0].user_name]
    )
    
    await db.query(
      'UPDATE users SET user_name = $1, img = $2, city = $3, education = $4, bio = $5, hobbies = $6 WHERE user_id = $7',
      [newUserName, img, city, education, bio, hobby, req.params.id]
    )

    return res.status(201).json({
      success: true,
      message: "Edit profile was successful"
    })
  } catch (err) {
    console.log(err.message);
  }
}