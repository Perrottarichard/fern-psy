import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { setUser } from './reducers/activeUserReducer'
import forumService from './services/forumService'
import MyNavbar from './components/MyNavbar';
import About from './components/About';
import LoginForm from './components/LoginForm'
import ForumPostMain from './components/ForumPostMain';
import ForumDisplayMain from './components/ForumDisplayMain'
import ContactForm from './components/ContactForm';
import AdminLoginForm from './components/AdminLoginForm';
import AdminContactsDashboard from './components/AdminContactsDashboard'
import AdminUsersDashboard from './components/AdminUsersDashboard'
import AdminForumDashboard from './components/AdminForumDashboard'
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
  console.log(activeUser.username)
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
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <ContactForm />
          </Route>
          <Route exact path="/forum/post">
            <ForumPostMain activeUser={activeUser} />
          </Route>
          <Route path="/forum">
            <ForumDisplayMain activeUser={activeUser} />
          </Route>
          <Route path="/login">
            <LoginForm setLoggedIn={setLoggedIn} />
          </Route>
          <Route path='/admin/dashboard'>
            {!activeUser || (!activeUser.username === 'Fern-Admin' || !activeUser.username === 'Richard-Admin') ?
              <NoPage /> :
              <div>
                <Button color='secondary' id='pendingToggler' style={{ margin: '0.5rem', position: 'relative', fontFamily: 'Montserrat' }}>Show Pending
                </Button>
                <Button color='secondary' id='contactsToggler' style={{ margin: '0.5rem', position: 'relative', fontFamily: 'Montserrat' }}>Show Contacts</Button>
                <Button color='secondary' id='usersToggler' style={{ margin: '0.5rem', position: 'relative', fontFamily: 'Montserrat' }}>Show Users</Button>
                <UncontrolledCollapse toggler="#pendingToggler">
                  <AdminForumDashboard />
                </UncontrolledCollapse>
                <UncontrolledCollapse toggler="#contactsToggler">
                  <AdminContactsDashboard />
                </UncontrolledCollapse>
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
