import axios from 'axios'
const baseUrl = '/api/contact'

const sendMessage = async message => {
  const response = await axios.post(baseUrl, message)
  console.log(response.data)
  return response.data
}
export default { sendMessage }