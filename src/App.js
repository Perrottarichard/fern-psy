import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
import { setUser, initStats } from './reducers/activeUserReducer'
import { initializeForumAnswered, initializeForumPending } from './reducers/forumReducer'
import forumService from './services/forumService'
import MyNavbar from './components/MyNavbar';

import userService from './services/userService';

const App = () => {
  const activeUser = useSelector(state => state.activeUser.user)
  const dispatch = useDispatch()
  const forumAnswered = useSelector(state => state.forum.answered)

  const [prefersDarkMode, setPrefersDarkMode] = useState(window.localStorage.getItem('AskFernDark'))

  useEffect(() => {
    if(!prefersDarkMode){
      window.localStorage.setItem('AskFernDark', 'false')
    }else{
      window.localStorage.setItem('AskFernDark', 'true')
    }
  }, [prefersDarkMode])

  const theme = () => createMuiTheme({palette: {type: prefersDarkMode ? 'dark' : 'light'}})
  const getLoggedUser = useCallback(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedForumUser');
    if (loggedUserJSON) {
      const existingUser = JSON.parse(loggedUserJSON);
      console.log(existingUser)
      dispatch(setUser(existingUser));
      forumService.setToken(existingUser.token);
      userService.setToken(existingUser.token);
      dispatch(initStats(existingUser._id))
    } else {
      console.log('no user');
    }
  }, [dispatch]);
  
  useEffect(() => {
    if (!activeUser) {
      getLoggedUser();
    } else {
      forumService.setToken(activeUser.token);
      userService.setToken(activeUser.token);
      if(!activeUser.username)
      dispatch(initStats(activeUser._id))
    }
  }, [dispatch, getLoggedUser, activeUser]);

  useEffect(() => {
    dispatch(initializeForumAnswered())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeForumPending())
  }, [dispatch])

  return (
    
    <MuiThemeProvider theme={theme()}>
    <CssBaseline/>
    <Router>
      <div className="App">
        <MyNavbar activeUser={activeUser} forumAnswered={forumAnswered} prefersDarkMode={prefersDarkMode} setPrefersDarkMode={setPrefersDarkMode}/>
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
