import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
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

  window.localStorage.setItem('AskFernDark', 'true');

  const prefersDarkMode = React.useRef()

  useEffect(() => {
    if(window.localStorage.getItem("AskFernDark")){
      prefersDarkMode.current = true;
    }else{
      prefersDarkMode.current = false;
    }
  })

  const theme = () => createMuiTheme({palette: {type: prefersDarkMode.current ? 'dark' : 'light'}})

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
    
    <MuiThemeProvider theme={theme()}>
    <CssBaseline/>
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
    </MuiThemeProvider>
  );
}

export default App;
