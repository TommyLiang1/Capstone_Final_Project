import axios from 'axios'

axios.defaults.withCredentials = true

// Get Posts
export async function getPosts() {
  return await axios.get('http://localhost:8000/api/posts')
}

// Get Post by Id
export async function getPostById(id) {
  return await axios.get(`http://localhost:8000/api/posts/${id}`)
}

// Create Post
export async function createPost(postData) {
  return await axios.post('http://localhost:8000/api/newpost', postData)
}

// Edit Post
export async function editPost(id, postData) {
  return await axios.put(`http://localhost:8000/api/editpost/${id}`, postData)
}

// Add Like to Post
export async function addLikePost(id) {
  return await axios.put(`http://localhost:8000/api/addlikepost/${id}`)
}

// Remove Like from Post
export async function removeLikePost(id) {
  return await axios.put(`http://localhost:8000/api/removelikepost/${id}`)
}

// Delete Post
export async function deletePost(id) {
  return await axios.delete(`http://localhost:8000/api/deletepost/${id}`)
} 