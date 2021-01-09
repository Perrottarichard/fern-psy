import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
import { setUser } from './reducers/activeUserReducer'
import { initializeForumAnswered } from './reducers/forumReducer'
import forumService from './services/forumService'
import MyNavbar from './components/MyNavbar';

import userService from './services/userService';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const activeUser = useSelector(state => state.activeUser.user)
  const dispatch = useDispatch()
  const forumAnswered = useSelector(state => state.forum.answered)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedForumUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      setLoggedIn(true)
      forumService.setToken(user.token)
      userService.setToken(user.token)
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeForumAnswered())
  }, [dispatch])

  return (
    <Router>
      <div className="App">
        <MyNavbar activeUser={activeUser} setLoggedIn={setLoggedIn} loggedIn={loggedIn} forumAnswered={forumAnswered} />
        {/* <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        /> */}
        
      </div>
    </Router >
  );
}

export default App;
