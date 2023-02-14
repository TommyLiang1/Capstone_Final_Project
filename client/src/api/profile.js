import axios from 'axios'

axios.defaults.withCredentials = true

// Get Profile
export async function getProfile(id) {
  return await axios.get(`http://localhost:8000/api/profile/${id}`)
}

// Edit Profile
export async function editProfile(id, profileData) {
  return await axios.put(`http://localhost:8000/api/editprofile/${id}`, profileData)
}