import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { badLogin, goodLogin, reset } from '../reducers/notificationReducer'
import loginService from '../services/loginService'
import forumService from '../services/forumService'
import { setUser } from '../reducers/userReducer'
import { Form, Label, FormGroup, Button, Input } from 'reactstrap'
import RegisterForm from './RegisterForm'

const textStyle = {
  textAlign: 'center',
  fontFamily: 'Poppins'
}
const formDivStyle = {
  display: 'block',
  textAlign: 'center'
}
const formStyle = {
  width: '70%',
  display: 'inline-block'
}
const labelStyle = {
  float: 'left',
  marginBottom: '0px',
  padding: '0px',
  fontFamily: 'Poppins'
}
const loginButtonStyle = {
  float: 'center',
  width: '100px'
}

const LoginForm = (props) => {
  const { setLoggedIn } = props
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  const handleChangeUser = (event) => {
    setUsername(event.target.value)
  }
  const handleChangePass = (event) => {
    setPassword(event.target.value)
  }
  const submitLogin = async event => {
    event.preventDefault()
    if (!username || !password) {
      alert('You must enter a username and password')
    }
    else {
      try {
        const user =
          await loginService.login({ username, password })
        window.localStorage.setItem(
          'loggedForumUser', JSON.stringify(user)
        )
        forumService.setToken(user.token)
        dispatch(setUser(user))
        setLoggedIn(true)
        dispatch(goodLogin(`Welcome back ${user.username}`))
        setTimeout(() => {
          dispatch(reset())
        }, 3000)
        setUsername('')
        setPassword('')
        history.push('/forum')
      }
      catch (error) {
        console.log(error.message)
        dispatch(badLogin('Something went wrong...'))
      }
    }
  }
  return (
    <div className='container' id='login-form'>
      <h2 style={textStyle}>Login</h2>
      <div id='form-div' style={formDivStyle}>
        <Form style={formStyle} onSubmit={submitLogin}>
          <FormGroup>
            <Label style={labelStyle}>Username:</Label>
            <Input onChange={handleChangeUser} value={username}></Input><br />
            <Label style={labelStyle}>Password:</Label> <Input id='password' type="password" onChange={handleChangePass} value={password}></Input><br />
            <Button color='primary' style={loginButtonStyle} id='submit-login' type="submit">Enter</Button>
          </FormGroup>
        </Form>
      </div>
      <br />
      <hr />
      <div id='no-account-div'>
        <p style={textStyle}>Don't have an account? </p>
        <RegisterForm />
      </div>
    </div>
  )
}

export default LoginForm