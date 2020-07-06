
const activeUserReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'CLEAR_USER':
      return action.data
    default:
      return state
  }
}

export const setUser = data => {
  console.log(data)
  return {
    type: 'SET_USER',
    data
  }
}
export const clearUser = () => {
  return {
    type: 'CLEAR_USER',
    data: null
  }
}

export default activeUserReducer