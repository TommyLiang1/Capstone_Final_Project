const db = require('../db/db');

exports.getProfile = async (req, res) => {
  try {
    const profile = await db.query('SELECT profile_id FROM users WHERE user_id = $1', [req.params.id])
    const { rows } = await db.query('SELECT * FROM profiles WHERE profile_id = $1', [profile.rows[0].profile_id]);

    return res.status(200).json({
      success: true,
      profile: rows[0],
    })
  } catch (err) {
    console.log(err.message);
  }
}

exports.editProfile = async (req, res) => {
  try {
    // console.log("updating profile...", req.body)
    await db.query(
      'UPDATE profiles SET profile_name = $1, profile_email = $2, img = $3, city = $4, education = $5, bio = $6, hobbies = $7 WHERE profile_id = $8',
      [req.body.profile_name, req.body.profile_email, req.body.img, req.body.city, req.body.education, req.body.bio, req.body.hobbies, req.body.profile_id])

    await db.query(
      'UPDATE users SET user_name = $1, user_email = $2 WHERE profile_id = $3',
      [req.body.profile_name, req.body.profile_email, req.body.profile_id]
    )

    return res.status(201).json({
      success: true,
      message: "Edit profile was successful"
    })
  } catch (err) {
    console.log(err.message);
  }
}