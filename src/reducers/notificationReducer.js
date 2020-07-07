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
    case 'ANSWERED_NOTIFY':
      return action.message
    case 'QUESTION_ASKED':
      return action.message
    case 'FAIL':
      return action.message
    case 'LOGOUT':
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
export const goodLogin = (message) => {
  return {
    type: 'GOOD_LOGIN',
    message: message
  }
}
export const goodRegister = () => {
  return {
    type: 'GOOD_REGISTER',
    message: `Successfully registered! You can now log in.`
  }
}
export const badLogin = (message) => {
  return {
    type: 'BAD_LOGIN',
    message: message
  }
}
export const badRegister = (message) => {
  return {
    type: 'BAD_REGISTER',
    message: message
  }
}
export const logoutNotify = () => {
  return {
    type: 'LOGOUT',
    message: 'You have logged out'
  }
}
export const answeredQuestion = () => {
  return {
    type: 'ANSWERED_NOTIFY',
    message: 'You answered a question'
  }
}
export const questionAsked = () => {
  return {
    type: 'QUESTION_ASKED',
    message: 'successful post'
  }
}
export const fail = () => {
  return {
    type: 'FAIL',
    message: 'Something went wrong...'
  }
}

export default notificationReducer