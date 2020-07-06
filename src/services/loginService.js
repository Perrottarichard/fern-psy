import axios from 'axios'
const baseUrl = '/api/login'
const adminUrl = '/api/admin'

const login = async user => {
  const response = await axios.post(baseUrl, user)
  return response.data
}
const adminLogin = async admin => {
  const response = await axios.post(adminUrl, admin)
  return response.data
}
export default { login, adminLogin }