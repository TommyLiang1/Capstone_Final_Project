import axios from 'axios'

axios.defaults.withCredentials = true

// Get Comments
export async function getComments() {
  return await axios.get('http://mendinghealth.space/api/comments')
}

// Get Comments by Post Id
export async function getCommentsByPostId(id) {
  return await axios.get(`http://mendinghealth.space/api/comments/${id}`)
}

// Create Comment
export async function createComment(id, commentData) {
  return await axios.post(`http://mendinghealth.space/api/newcomment/${id}`, commentData)
}

// Edit Comment
export async function editComment(id, commentData) {
  return await axios.put(`http://mendinghealth.space/api/editcomment/${id}`, commentData)
}

// Add Like to Comment
export async function addLikeComment(id) {
  return await axios.put(`http://mendinghealth.space/api/addlikecomment/${id}`)
}

// Remove Like from Comment
export async function removeLikeComment(id) {
  return await axios.put(`http://mendinghealth.space/api/removelikecomment/${id}`)
}

// Delete Comment
export async function deleteComment(id) {
  return await axios.delete(`http://mendinghealth.space/api/deletecomment/${id}`)
} 