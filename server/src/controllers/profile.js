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
    const {profile_name, img, city, education, bio, hobby} = req.body;
    await db.query(
      'UPDATE users SET user_name = $1, img = $2, city = $3, education = $4, bio = $5, hobbies = $6 WHERE user_id = $7',
      [profile_name, img, city, education, bio, hobby, req.params.id])

    await db.query(
      'UPDATE posts SET post_name = $1 WHERE user_id = $2',
      [profile_name, req.params.id])

    /*await db.query(
      'UPDATE comments SET comment_name = $1 WHERE user_id = $2',
      [req.body.profile_name, req.params.id])*/

    return res.status(201).json({
      success: true,
      message: "Edit profile was successful"
    })
  } catch (err) {
    console.log(err.message);
  }
}