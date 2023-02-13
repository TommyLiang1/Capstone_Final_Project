import axios from 'axios'

axios.defaults.withCredentials = true

// Register User
export async function onRegistration(registrationData) {
  return await axios.post('http://localhost:8000/api/register', registrationData)
}

// Log In
export async function onLogin(loginData) {
  return await axios.post('http://localhost:8000/api/login', loginData)
}

// Log Out
export async function onLogout() {
  return await axios.get('http://localhost:8000/api/logout')
}

// Test Auth User
export async function fetchProtectedInfo() {
  return await axios.get('http://localhost:8000/api/protected')
}

// Get Profile
export async function getProfile(id) {
  return await axios.get(`http://localhost:8000/api/profile/${id}`)
}

// Edit Profile
export async function editProfile(id, profileData) {
  return await axios.put(`http://localhost:8000/api/editprofile/${id}`, profileData)
}