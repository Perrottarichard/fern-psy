import contactService from '../services/contactService'

const contactReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_CONTACTS':
      return action.data
    default:
      return state
  }
}

export const initializeContacts = () => {
  return async dispatch => {
    const contact = await contactService.getAll()
    dispatch({
      type: 'INIT_CONTACTS',
      data: contact
    })
  }
}

export default contactReducer