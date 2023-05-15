import axios from 'axios'

axios.defaults.withCredentials = true

// Get Posts Liked By User
export async function getPostsLikedByUser(id) {
  return await axios.get(`http://mendinghealth.space/api/likeposts/${id}`)
}

// Like Post From User
export async function likePostFromUser(likeData) {
  return await axios.post('http://mendinghealth.space/api/likepost', likeData)
}

// Unlike Post From User
export async function unlikePostFromUser(id) {
  return await axios.delete(`http://mendinghealth.space/api/unlikepost/${id}`)
}

// Get Comments Liked By User
export async function getCommentsLikedByUser(id) {
  return await axios.get(`http://mendinghealth.space/api/likecomments/${id}`)
}

// Like Comment From User
export async function likeCommentFromUser(likeData) {
  return await axios.post('http://mendinghealth.space/api/likecomment', likeData)
}

// Unlike Comment From User
export async function unlikeCommentFromUser(id) {
  return await axios.delete(`http://mendinghealth.space/api/unlikecomment/${id}`)
}