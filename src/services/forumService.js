import axios from 'axios'
const baseUrl = '/api/forum'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getPending = async () => {
  const response = await axios.get(`${baseUrl}/pending`)
  return response.data
}


const getAnswered = async () => {
  const response = await axios.get(`${baseUrl}/answered`)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject) => {
  const response = await axios.put(`${baseUrl}/${newObject._id}`, newObject)
  return response.data
}


const addComment = async (comment, postToModify) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/addcomment/${postToModify._id}`, { postToModify, comment }, config)
  return response.data
}
const remove = async question => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${question.id}`, config)
  return response.data
}

const heartUp = async (toUpdate) => {
  const id = toUpdate._id
  const response = await axios.put(`${baseUrl}/heart/${id}`, toUpdate)
  return response.data
}

export default { getPending, getAnswered, create, update, setToken, remove, heartUp, addComment }