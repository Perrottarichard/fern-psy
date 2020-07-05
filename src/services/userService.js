import axios from 'axios'
const baseUrl = '/api/users'

const signUp = async user => {
  const response = await axios.post(`${baseUrl}/signUp`, user)
  return response.data
}
export default { signUp }