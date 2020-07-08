import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from "react-toastify"
import { setUser } from '../reducers/activeUserReducer'
import loginService from '../services/loginService'
import forumService from '../services/forumService'

import { Form, Label, FormGroup, Button, Input } from 'reactstrap'
import RegisterForm from './RegisterForm'

const textStyle = {
  textAlign: 'center',
  fontFamily: 'Montserrat',
  color: 'black'
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
  fontFamily: 'Montserrat',
  color: 'white'
}
const loginButtonStyle = {
  float: 'center',
  width: '200px',
  backgroundColor: '#288046',
  fontFamily: 'Montserrat'
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
      toast.warn('You must enter a username and password')
    }
    else {
      try {
        const user =
          await loginService.userlogin({ username, password })
        window.localStorage.setItem(
          'loggedForumUser', JSON.stringify(user)
        )
        forumService.setToken(user.token)
        dispatch(setUser(user))
        toast.info(`Welcome back ${user.username}`)
        setLoggedIn(true)
        setUsername('')
        setPassword('')
        history.push('/forum')
      }
      catch (error) {
        console.log(error.message)

        if (error.message.includes('401')) {
          toast.error('Check your username and password again')
        } else {
          toast.error('Something went wrong...')
        }
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
            <Button style={loginButtonStyle} id='submit-login' type="submit">Enter</Button>
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