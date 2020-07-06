import axios from 'axios'
const baseUrl = '/api/contact'

const sendContact = async message => {
  const response = await axios.post(baseUrl, message)
  console.log(response.data)
  return response.data
}
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
export default { sendContact, getAll }