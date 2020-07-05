import axios from 'axios'
const baseUrl = '/api/users'

const registerUser = async user => {
  const response = await axios.post(`${baseUrl}/register`, user)
  return response.data
}
export default { registerUser }