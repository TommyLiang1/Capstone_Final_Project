const db = require('../db/db');

exports.getPosts = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM posts');

    return res.status(200).json({
      success: true,
      posts: rows,
    })
  } catch (err) {
    console.log(err.message);
  }
}

exports.getPostById = async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM posts WHERE post_id = $1',
      [req.params.id]
    );

    return res.status(200).json({
      success: true,
      post: rows,
    })
  } catch (err) {
    console.log(err.message);
  }
}

exports.createPost = async (req, res) => {
  const {id, username, message} = req.body;
  try {
    console.log(req.body)
    await db.query(
      'INSERT INTO posts (post_name, description_text, likes, comments, user_id) VALUES ($1, $2, $3, $4, $5)',
      [username, message, 0, 0, id]
    )

    return res.status(200).json({
      success: true,
      message: 'Post created successfully!'
    })
  } catch (err) {
    console.log(err.message);
  }
}

exports.editPost = async (req, res) => {
  const {title, description} = req.body;
  try {
    await db.query(
      'UPDATE posts SET title = $1, description_text = $2 WHERE post_id = $3',
      [title, description, req.params.id]
    )

    return res.status(200).json({
      success: true,
      message: 'Post edited successfully!'
    })
  } catch (err) {
    console.log(err.message);
  }
}

exports.addLike = async (req, res) => {
  try {
    console.log("add Like to: " + req.params.id)
    await db.query(
      'UPDATE posts SET likes = likes + 1 WHERE post_id = $1', 
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
    console.log("remove Like to: " + req.params.id)
    await db.query(
      'UPDATE posts SET likes = likes - 1 WHERE post_id = $1', 
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

exports.deletePost = async (req, res) => {
  try {
    await db.query(
      'DELETE FROM posts WHERE post_id = $1',
      [req.params.id]
    )

    await db.query(
      'DELETE FROM comments WHERE post_id = $1',
      [req.params.id]
    )

    return res.status(200).json({
      success: true,
      message: 'Post deleted successfully!'
    })
  } catch (err) {
    console.log(err.message);
  }
}