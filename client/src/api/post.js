import axios from 'axios'

axios.defaults.withCredentials = true

// Get Posts
export async function getPosts() {
  return await axios.get('http://mendinghealth.space/api/posts')
}

// Get Post by Id
export async function getPostById(id) {
  return await axios.get(`http://mendinghealth.space/api/posts/${id}`)
}

// Create Post
export async function createPost(postData) {
  return await axios.post('http://mendinghealth.space/api/newpost', postData)
}

// Edit Post
export async function editPost(id, postData) {
  return await axios.put(`http://mendinghealth.space/api/editpost/${id}`, postData)
}

// Add Like to Post
export async function addLikePost(id) {
  return await axios.put(`http://mendinghealth.space/api/addlikepost/${id}`)
}

// Remove Like from Post
export async function removeLikePost(id) {
  return await axios.put(`http://mendinghealth.space/api/removelikepost/${id}`)
}

// Delete Post
export async function deletePost(id) {
  return await axios.delete(`http://mendinghealth.space/api/deletepost/${id}`)
} 