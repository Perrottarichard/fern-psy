import contactService from '../services/contactService'

const contactReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_CONTACTS':
      return action.data
    case 'SET_CONTACT_HIDDEN':
      return state.filter(c => c._id !== action.data._id)
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
export const setContactHidden = (contact) => {
  return async dispatch => {
    const hiddenContact = { ...contact, hidden: true }
    await contactService.hideContact(hiddenContact)
    dispatch({
      type: 'SET_CONTACT_HIDDEN',
      data: hiddenContact
    })
  }
}

export default contactReducer