import axios from 'axios'

axios.defaults.withCredentials = true

// Register User
export async function onRegistration(registrationData) {
  return await axios.post('http://mendinghealth.space/api/register', registrationData)
}

// Log In
export async function onLogin(loginData) {
  return await axios.post('http://mendinghealth.space/api/login', loginData)
}

// Google Log In
export async function onGoogleLogin(googleData) {
  return await axios.post('http://mendinghealth.space/api/google/login', googleData)
}

// Log Out
export async function onLogout() {
  return await axios.get('http://mendinghealth.space/api/logout')
}

// Test Auth User
export async function fetchProtectedInfo() {
  return await axios.get('http://mendinghealth.space/api/protected')
}

// Get Users
export async function getUsers() {
  return await axios.get('http://mendinghealth.space/api/users')
}

// Get User By Id
export async function getUserById(id) {
  return await axios.get(`http://mendinghealth.space/api/user/${id}`)
}

// Get User By Email
export async function getUserByEmail(email) {
  return await axios.get('http://mendinghealth.space/api/user', email)
}