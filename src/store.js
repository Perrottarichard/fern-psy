
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import forumReducer from './reducers/forumReducer'
import activeUserReducer from './reducers/activeUserReducer'
import contactReducer from './reducers/contactReducer'
import userInfoForAdminReducer from './reducers/userInfoForAdminReducer'


const appReducer = combineReducers({
  forum: forumReducer,
  activeUser: activeUserReducer,
  contact: contactReducer,
  userInfoForAdmin: userInfoForAdminReducer
})
const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }
  return appReducer(state, action)
}

const persistConfig = {
  key: 'root',
  storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))

export const persistor = persistStore(store)





