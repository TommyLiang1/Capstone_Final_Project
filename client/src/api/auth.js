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

// Google Log In
export async function onGoogleLogin(googleData) {
  return await axios.post('http://localhost:8000/api/google/login', googleData)
}

// Log Out
export async function onLogout() {
  return await axios.get('http://localhost:8000/api/logout')
}

// Test Auth User
export async function fetchProtectedInfo() {
  return await axios.get('http://localhost:8000/api/protected')
}

// Get Users
export async function getUsers() {
  return await axios.get('http://localhost:8000/api/users')
}

// Get User By Id
export async function getUserById(id) {
  return await axios.get(`http://localhost:8000/api/user/${id}`)
}

// Get User By Email
export async function getUserByEmail(email) {
  return await axios.get('http://localhost:8000/api/user', email)
}