const db = require('../db/db');

exports.getLikesToPosts = async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT like_id, post_id FROM likes WHERE user_id = $1',
      [req.params.id]
    )

    if(rows.length === 0) {
      return res.status(200).json({
        success: true,
        postIds: rows,
        message: "User hasn't like a post yet"
      })
    }
    return res.status(200).json({
      success: true,
      postIds: rows
    })
    
  } catch (err) {
    console.log(err.message);
  }
}

exports.addUserLikeToPost = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    await db.query(
      'INSERT INTO likes (user_id, post_id) VALUES ($1, $2)',
      [userId, postId]
    );

    return res.status(200).json({
      success: true,
      message: "Like post successful"
    })
  } catch (err) {
    console.log(err.message);
  }
}

exports.removeUserLikeToPost = async (req, res) => {
  try {
    await db.query(
      'DELETE FROM likes WHERE like_id = $1',
      [req.params.id]
    );
    
    return res.status(200).json({
      success: true,
      message: "Unlike post succesful",
    })
  } catch (err) {
    console.log(err.message);
  }
}

exports.getLikesToComments = async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT like_id, comment_id FROM likes WHERE user_id = $1',
      [req.params.id]
    )

    if(rows.length === 0) {
      return res.status(200).json({
        success: true,
        rows: rows,
        message: "User hasn't like a comment yet"
      })
    }

    return res.status(200).json({
      success: true,
      commentIds: rows,
    })
  } catch (err) {
    console.log(err.message);
  }
}

exports.addUserLikeToComment = async (req, res) => {
  try {
    const { userId, commentId } = req.body;
    await db.query(
      'INSERT INTO likes (user_id, comment_id) VALUES ($1, $2)',
      [userId, commentId]
    )

    return res.status(200).json({
      success: true,
      message: 'Like comment successful'
    })
  } catch (err) {
    console.log(err.message);
  }
}

exports.removeUserLikeToComment = async (req, res) => {
  try {
    await db.query(
      'DELETE FROM likes WHERE like_id = $1',
      [req.params.id]
    )

    return res.status(200).json({
      success: true,
      message: 'Unlike comment successful'
    })
  } catch (err) {
    console.log(err.message);
  }
}