const db = require('../db/db');

// increment comment count when a comment is created
addComment = async (req, res) => {
  try {
    await db.query(
      'UPDATE posts SET comments = comments + 1 WHERE post_id = $1',
      [req]
    )

  } catch (err) {
    console.log(err.message);
  }
}

// decrement comment count when a comment is deleted
removeComment = async (req, res) => {
  try {
    await db.query(
      'UPDATE posts SET comments = comments - 1 WHERE post_id = $1',
      [req]
    )

  } catch (err) {
    console.log(err.message);
  }
}

exports.getComments = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM comments');

    return res.status(200).json({
      success: true,
      comments: rows,
    })
  } catch (err) {
    console.log(err.message);
  }
}

exports.getCommentsByPostId = async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM comments WHERE post_id = $1',
      [req.params.id]
    );

    return res.status(200).json({
      success: true,
      comments: rows,
    })    

  } catch (err) {
    console.log(err.message);
  }
}

exports.getCommentById = async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM comments WHERE comment_id = $1',
      [req.params.id]
    );

    return res.status(200).json({
      success: true,
      comment: rows,
    })    

  } catch (err) {
    console.log(err.message);
  }
}

exports.createComment = async (req, res) => {
  const {username, description} = req.body;
  try {
    await db.query(
      'INSERT INTO comments (comment_name, description_text, likes, post_id) VALUES ($1, $2, $3, $4)',
      [username, description, 0, req.params.id]
    )

    addComment(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Comment created successfully!'
    })
  } catch (err) {
    console.log(err.message);
  }
}

exports.editComment = async (req, res) => {
  const {description} = req.body;
  try {
    await db.query(
      'UPDATE comments SET description_text = $1 WHERE comment_id = $2',
      [description, req.params.id]
    )

    return res.status(200).json({
      success: true,
      message: 'Comment edited successfully!'
    })
  } catch (err) {
    console.log(err.message);
  }
}

exports.addLike = async (req, res) => {
  try {
    await db.query(
      'UPDATE comments SET likes = likes + 1 WHERE comment_id = $1', 
      [req.params.id]
    )

    return res.status(200).json({
      success: true,
      message: 'Like increased successfully!'
    })
  } catch (err) {
    console.log(err.message);
  }
}

exports.removeLike = async (req, res) => {
  try {
    await db.query(
      'UPDATE comments SET likes = likes - 1 WHERE comment_id = $1', 
      [req.params.id]
    )

    return res.status(200).json({
      success: true,
      message: 'Like decreased successfully!'
    })
  } catch (err) {
    console.log(err.message);
  }
}

exports.deleteComment = async (req, res) => {
  try {
    await db.query(
      'DELETE FROM comments WHERE comment_id = $1',
      [req.params.id]
    )

    removeComment(req.params.id)

    return res.status(200).json({
      success: true,
      message: 'Comment deleted successfully!'
    })
  } catch (err) {
    console.log(err.message);
  }
}