import axios from 'axios'

axios.defaults.withCredentials = true

// Get Comments
export async function getComments() {
  return await axios.put('http://localhost:8000/api/comments')
}

// Get Comments by Post Id
export async function getCommentByPostId(id) {
  return await axios.put(`http://localhost:8000/api/comment/${id}`)
}

// Create Comment
export async function createComment(id, commentData) {
  return await axios.post(`http://localhost:8000/api/newcomment/${id}`, commentData)
}

// Edit Comment
export async function editComment(id, commentData) {
  return await axios.put(`http://localhost:8000/api/editcomment/${id}`, commentData)
}

// Add Like to Comment
export async function addLikeComment(id) {
  return await axios.put(`http://localhost:8000/api/addlikecomment/${id}`)
}

// Remove Like from Comment
export async function removeLikeComment(id) {
  return await axios.put(`http://localhost:8000/api/removelikecomment/${id}`)
}

// Delete Comment
export async function deleteComment(id) {
  return await axios.delete(`http://localhost:8000/api/deletecomment/${id}`)
} 