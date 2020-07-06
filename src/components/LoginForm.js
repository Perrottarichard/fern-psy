import React, { useState } from 'react'
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
const inputStyle = {
  float: 'left',
  marginBottom: '1rem'
}
const loginButtonStyle = {
  float: 'left'
}

const LoginForm = (props) => {
  const { setLoggedIn } = props
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleChangeUser = (event) => {
    setUsername(event.target.value)
  }
  const handleChangePass = (event) => {
    setPassword(event.target.value)
  }
  const submitLogin = async event => {
    event.preventDefault()
    try {
      const user =
        await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedForumUser', JSON.stringify(user)
      )
      forumService.setToken(user.token)
      dispatch(setUser(user))
      setLoggedIn(true)
      dispatch(goodLogin())
      setTimeout(() => {
        dispatch(reset())
      }, 1000)
      setUsername('')
      setPassword('')
      console.log(user)
    }
    catch (error) {
      dispatch(badLogin())
      setTimeout(() => {
        dispatch(reset())
      }, 3000)
    }
  }
  return (
    <div className='container' id='login-form'>
      <h2 style={textStyle}>Login</h2>
      <div id='form-div' style={formDivStyle}>
        <Form style={formStyle} onSubmit={submitLogin}>
          <FormGroup>
            <Label style={labelStyle}>Username:</Label>
            <Input style={inputStyle} onChange={handleChangeUser} value={username}></Input>
            <Label style={labelStyle}>Password:</Label> <Input style={inputStyle} id='password' type="password" onChange={handleChangePass} value={password}></Input>
            <Button color='success' style={loginButtonStyle} id='submit-login' type="submit">Login</Button>
          </FormGroup>
        </Form>
      </div>
      <br />
      <p style={textStyle}>Don't have an account? </p>
      <RegisterForm />
    </div>
  )
}

export default LoginForm