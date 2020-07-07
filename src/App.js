import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { setUser } from './reducers/activeUserReducer'
import forumService from './services/forumService'
import MyNavbar from './components/MyNavbar';
import About from './components/About';
import LoginForm from './components/LoginForm'
import ForumMain from './components/ForumMain';
import ContactForm from './components/ContactForm';
import Notification from './components/Notification'
import AdminLoginForm from './components/AdminLoginForm';
import AdminContactsDashboard from './components/AdminContactsDashboard'
import AdminUsersDashboard from './components/AdminUsersDashboard'
import NoPage from './components/NoPage'
import { Button, UncontrolledCollapse } from 'reactstrap';
//import { initializeQuestions } from './reducers/forumReducer';


const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  // const forum = useSelector(state => state.forum)
  const activeUser = useSelector(state => state.activeUser)
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
        <MyNavbar activeUser={activeUser} setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
        <Notification />
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <ContactForm />
          </Route>
          <Route path="/forum">
            <ForumMain activeUser={activeUser} />
          </Route>
          <Route path="/login">
            <LoginForm setLoggedIn={setLoggedIn} />
          </Route>
          <Route path='/admin/dashboard'>
            {!activeUser || activeUser.username !== 'Fern-Admin' ?
              <NoPage /> :
              <div>
                <Button color='secondary' id='contactsToggler' style={{ margin: '0.5rem' }}>Show Contacts</Button>
                <UncontrolledCollapse toggler="#contactsToggler">
                  <AdminContactsDashboard />
                </UncontrolledCollapse>
                <Button color='secondary' id='usersToggler' style={{ margin: '0.5rem' }}>Show Users</Button>
                <UncontrolledCollapse toggler="#usersToggler">
                  <AdminUsersDashboard />
                </UncontrolledCollapse>
              </div>
            }
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
