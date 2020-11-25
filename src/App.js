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
import SinglePostDisplay from './components/SinglePostDisplay';
import MyQuestions from './components/MyQuestions'
import AdminFlaggedComment from './components/AdminFlaggedComment';
import AdminAnswers from './components/AdminAnswers'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const activeUser = useSelector(state => state.activeUser)
  const dispatch = useDispatch()
  const forumAnswered = useSelector(state => state.forum.answered)

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
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/contact">
            <ContactForm />
          </Route>
          <Route path="/forum/:tag">
            <SingleTagDisplay activeUser={activeUser} />
          </Route>
          <Route path="/myquestions/:id">
            <MyQuestions activeUser={activeUser} />
          </Route>
          <Route exact path="/">
            <ForumLandingPage activeUser={activeUser} />
          </Route>
          <Route path="/post/:id">
            <SinglePostDisplay activeUser={activeUser} />
          </Route>
          <Route path="/addpost">
            <ForumPostMain activeUser={activeUser} />
          </Route>
          <Route path="/allquestions">
            <ForumDisplayAll activeUser={activeUser} forumAnswered={forumAnswered} />
          </Route>
          <Route path="/login">
            <LoginForm setLoggedIn={setLoggedIn} />
          </Route>
          <Route path='/admin/dashboard'>
            {!activeUser || (activeUser.username !== 'Fern-Admin' && activeUser.username !== 'Richard-Admin') ?
              <NoPage /> :
              <Container>
                <Button color='secondary' id='pendingToggler' style={{ margin: '0.5rem', position: 'relative', fontFamily: 'Montserrat', width: '80px', fontSize: '12px', padding: '10px' }}>Pending Questions
                </Button>
                <Button color='secondary' id='answersToggler' style={{ margin: '0.5rem', position: 'relative', fontFamily: 'Montserrat', width: '80px', fontSize: '12px', padding: '10px' }}>My Answers</Button>
                <Button color='secondary' id='contactsToggler' style={{ margin: '0.5rem', position: 'relative', fontFamily: 'Montserrat', width: '80px', fontSize: '12px', padding: '10px' }}>Private Messages</Button>
                <Button color='secondary' id='usersToggler' style={{ margin: '0.5rem', position: 'relative', fontFamily: 'Montserrat', width: '80px', fontSize: '12px', padding: '10px' }}>Show All Users</Button>
                <Button color='secondary' id='flaggedToggler' style={{ margin: '0.5rem', position: 'relative', fontFamily: 'Montserrat', width: '80px', fontSize: '12px', padding: '10px' }}>Flagged Comments</Button>
                <UncontrolledCollapse toggler="#pendingToggler">
                  <AdminForumDashboard />
                </UncontrolledCollapse>
                <UncontrolledCollapse toggler="#answersToggler">
                  <AdminAnswers />
                </UncontrolledCollapse>
                <UncontrolledCollapse toggler="#contactsToggler">
                  <AdminContactsDashboard />
                </UncontrolledCollapse>
                <UncontrolledCollapse toggler="#usersToggler">
                  <AdminUsersDashboard />
                </UncontrolledCollapse>
                <UncontrolledCollapse toggler="#flaggedToggler">
                  <AdminFlaggedComment />
                </UncontrolledCollapse>
              </Container>
            }
          </Route>
          <Route exact path="/admin">
            <AdminLoginForm setLoggedIn={setLoggedIn} />
          </Route>
        </Switch>
      </div>
    </Router >
  );
}

export default App;
