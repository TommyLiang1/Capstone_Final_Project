import axios from 'axios'

axios.defaults.withCredentials = true

// Get Posts Liked By User
export async function getPostsLikedByUser(id) {
  return await axios.get(`http://localhost:8000/api/likeposts/${id}`)
}

// Like Post From User
export async function likePostFromUser(likeData) {
  return await axios.post('http://localhost:8000/api/likepost', likeData)
}

// Unlike Post From User
export async function unlikePostFromUser(id) {
  return await axios.delete(`http://localhost:8000/api/unlikepost/${id}`)
}

// Get Comments Liked By User
export async function getCommentsLikedByUser(id) {
  return await axios.get(`http://localhost:8000/api/likecomments/${id}`)
}

// Like Comment From User
export async function likeCommentFromUser(likeData) {
  return await axios.post('http://localhost:8000/api/likecomment', likeData)
}

// Unlike Comment From User
export async function unlikeCommentFromUser(id) {
  return await axios.delete(`http://localhost:8000/api/unlikecomment/${id}`)
}