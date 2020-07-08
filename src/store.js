
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import forumReducer from './reducers/forumReducer'
import activeUserReducer from './reducers/activeUserReducer'
import contactReducer from './reducers/contactReducer'
import userInfoForAdminReducer from './reducers/userInfoForAdminReducer'


const reducer = combineReducers({
  forum: forumReducer,
  activeUser: activeUserReducer,
  contact: contactReducer,
  userInfoForAdmin: userInfoForAdminReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store