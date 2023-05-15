import axios from 'axios'

axios.defaults.withCredentials = true

// Get Profile
export async function getProfile(id) {
  return await axios.get(`http://mendinghealth.space/api/profile/${id}`)
}

// Edit Profile
export async function editProfile(id, profileData) {
  return await axios.put(`http://mendinghealth.space/api/editprofile/${id}`, profileData)
}