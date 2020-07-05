const nada = ''
const notificationReducer = (state = nada, action) => {
  switch (action.type) {
    case 'LIKE_QUESTION':
      return action.message
    case 'CREATE_QUESTION':
      return action.message
    case 'DELETE_QUESTION':
      return action.message
    case 'GOOD_LOGIN':
      return action.message
    case 'GOOD_REGISTER':
      return action.message
    case 'BAD_LOGIN':
      return action.message
    case 'BAD_REGISTER':
      return action.message
    case 'RESET':
      return nada
    default:
      return state
  }
}
export const voteMessage = () => {
  return {
    type: 'LIKE_QUESTION',
    message: 'You liked a question!'
  }
}
export const createMessage = () => {
  return {
    type: 'CREATE_QUESTION',
    message: `Congratulations! You added a new question to the forum.`
  }
}
export const reset = () => {
  return {
    type: 'RESET',
    message: nada
  }
}
export const deleteMessage = () => {
  return {
    type: 'DELETE_QUESTION',
    message: `You deleted a question`
  }
}
export const goodLogin = () => {
  return {
    type: 'GOOD_LOGIN',
    message: `Welcome back!`
  }
}
export const goodRegister = () => {
  return {
    type: 'GOOD_REGISTER',
    message: `Successfully registered!`
  }
}
export const badLogin = () => {
  return {
    type: 'BAD_LOGIN',
    message: `Sorry. Please try again`
  }
}
export const badRegister = () => {
  return {
    type: 'BAD_REGISTER',
    message: `Sorry. Please try again`
  }
}

export default notificationReducer