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

const getFlagged = async () => {
  const response = await axios.get(`${baseUrl}/flagged`)
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
const updateEditedAnswer = async (newObject) => {
  const response = await axios.put(`${baseUrl}/editanswer/${newObject._id}`, newObject)
  return response.data
}

const addComment = async (comment, postToModify) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/addcomment/${postToModify._id}`, { postToModify, comment }, config)
  return response.data
}

const remove = async idToDelete => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${idToDelete}`, config)
  return response.data
}
const removeComment = async idToDelete => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/comment/${idToDelete}`, config)
  return response.data
}
const unflag = async idToUnflag => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/comment/unflag/${idToUnflag}`, { idToUnflag }, config)
  return response.data
}

const heartUp = async (toUpdate) => {
  const id = toUpdate._id
  const response = await axios.put(`${baseUrl}/heart/${id}`, toUpdate)
  return response.data
}
const flagComment = async (c) => {
  const response = await axios.put(`${baseUrl}/flag/${c._id}`)
  return response.data
}

export default { getPending, getAnswered, create, update, setToken, remove, heartUp, addComment, flagComment, getFlagged, removeComment, unflag, updateEditedAnswer }