import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { setUser } from './reducers/activeUserReducer'
import { initializeForumAnswered } from './reducers/forumReducer'
import forumService from './services/forumService'
import MyNavbar from './components/MyNavbar';
import About from './components/About';
import LoginForm from './components/LoginForm'
import ForumPostMain from './components/ForumPostMain';
import ForumDisplayAll from './components/ForumDisplayAll'
import ForumLandingPage from './components/ForumLandingPage'
import ContactForm from './components/ContactForm';
import AdminLoginForm from './components/AdminLoginForm';
import AdminContactsDashboard from './components/AdminContactsDashboard'
import AdminUsersDashboard from './components/AdminUsersDashboard'
import AdminForumDashboard from './components/AdminForumDashboard'
import NoPage from './components/NoPage'
import { Button, UncontrolledCollapse, Container } from 'reactstrap';
import SingleTagDisplay from './components/SingleTagDisplay';

//import { initializeQuestions } from './reducers/forumReducer';


const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  // const forum = useSelector(state => state.forum)
  const activeUser = useSelector(state => state.activeUser)
  const dispatch = useDispatch()
  const forumAnswered = useSelector(state => state.forum.answered)

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


  useEffect(() => {
    dispatch(initializeForumAnswered())
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
          <Route exact path="/forum/:tag">
            <SingleTagDisplay activeUser={activeUser} forumAnswered={forumAnswered} />
          </Route>
          <Route exact path="/forum">
            <ForumLandingPage activeUser={activeUser} forumAnswered={forumAnswered} />
          </Route>
          <Route exact path="/forum/post">
            <ForumPostMain activeUser={activeUser} />
          </Route>
          <Route path="/forum/all">
            <ForumDisplayAll activeUser={activeUser} forumAnswered={forumAnswered} />
          </Route>
          <Route path="/login">
            <LoginForm setLoggedIn={setLoggedIn} />
          </Route>
          <Route path='/admin/dashboard'>
            {!activeUser || (activeUser.username !== 'Fern-Admin' && activeUser.username !== 'Richard-Admin') ?
              <NoPage /> :
              <Container>
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
              </Container>
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
