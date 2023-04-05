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
    await db.query(
      'UPDATE users SET user_name = $1, user_email = $2, img = $3, city = $4, education = $5, bio = $6, hobbies = $7 WHERE user_id = $8',
      [req.body.profile_name, req.body.profile_email, req.body.img, req.body.city, req.body.education, req.body.bio, req.body.hobbies, req.params.id])

    return res.status(201).json({
      success: true,
      message: "Edit profile was successful"
    })
  } catch (err) {
    console.log(err.message);
  }
}