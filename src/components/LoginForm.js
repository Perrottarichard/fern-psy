import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { badLogin, goodLogin, reset } from '../reducers/notificationReducer'
import loginService from '../services/loginService'
import forumService from '../services/forumService'
import { setUser } from '../reducers/userReducer'
import { Form, Label, FormGroup, Button, Input } from 'reactstrap'
import RegisterForm from './RegisterForm'

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
    <div className='container'>
      <h2>Login</h2>
      <Form onSubmit={submitLogin}>
        <FormGroup>
          <Label>Username:</Label>
          <Input onChange={handleChangeUser} value={username}></Input>
          <Label>Password:</Label> <Input id='password' type="password" onChange={handleChangePass} value={password}></Input>
          <Button id='submit-login' type="submit">Login</Button>
          <hr />
        </FormGroup>
      </Form>
      <p>Don't have an account? </p>
      <RegisterForm />
    </div>
  )
}

export default LoginForm