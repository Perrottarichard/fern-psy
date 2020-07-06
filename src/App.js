import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import MyNavbar from './components/MyNavbar';
import About from './components/About';
import LoginForm from './components/LoginForm'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ForumMain from './components/ForumMain';
import ContactForm from './components/ContactForm';
import Notification from './components/Notification'
import forumService from './services/forumService'
import { setUser } from './reducers/userReducer'
import AdminLoginForm from './components/AdminLoginForm';
import AdminDashboard from './components/AdminDashboard'
import NoPage from './components/NoPage'
//import { initializeQuestions } from './reducers/forumReducer';


const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const forum = useSelector(state => state.forum)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(initializeQuestions())
  // }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedForumUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      setLoggedIn(true)
      forumService.setToken(user.token)
    }
  }, [dispatch])


  return (
    <Router>
      <div className="App">
        <MyNavbar user={user} setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
        <Notification />
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <ContactForm />
          </Route>
          <Route path="/forum">
            <ForumMain />
          </Route>
          <Route path="/login">
            <LoginForm setLoggedIn={setLoggedIn} />
          </Route>
          <Route path='/admin/dashboard'>
            {!user || user.username !== 'Fern-Admin' ?
              <NoPage /> :
              <AdminDashboard />}
          </Route>
          <Route path="/admin">
            <AdminLoginForm setLoggedIn={setLoggedIn} />
          </Route>
        </Switch>

      </div>
    </Router >
  );
}

export default App;
