import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { badLogin, goodLogin, reset } from '../reducers/notificationReducer'
import loginService from '../services/loginService'
import forumService from '../services/forumService'
import { setUser } from '../reducers/activeUserReducer'
import { Form, Label, FormGroup, Button, Input } from 'reactstrap'

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
  width: '200px'
}

const AdminLoginForm = (props) => {
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
        const admin =
          await loginService.adminLogin({ username, password })
        window.localStorage.setItem(
          'loggedForumUser', JSON.stringify(admin)
        )
        forumService.setToken(admin.token)
        dispatch(setUser(admin))
        setLoggedIn(true)
        dispatch(goodLogin(`Welcome back ${admin.username}`))
        setTimeout(() => {
          dispatch(reset())
        }, 3000)
        setUsername('')
        setPassword('')
        history.push('/admin/dashboard')
      }
      catch (error) {
        console.log(error.message)
        if (error.message.includes('401')) {
          dispatch(badLogin('Are you sure you are the admin? Check your username and password again...'))
        } else {
          dispatch(badLogin('Something went wrong...'))
        }
      }
    }
  }
  return (
    <div className='container' id='admin-login-form'>
      <h2 style={textStyle}>Admin Login</h2>
      <div id='form-div' style={formDivStyle}>
        <Form style={formStyle} onSubmit={submitLogin}>
          <FormGroup>
            <Label style={labelStyle}>Username:</Label>
            <Input onChange={handleChangeUser} value={username}></Input><br />
            <Label style={labelStyle}>Password:</Label> <Input id='password' type="password" onChange={handleChangePass} value={password}></Input><br />
            <Button color='none' style={loginButtonStyle} id='admin-submit-login' type="submit">Enter</Button>
          </FormGroup>
        </Form>
      </div>
    </div>
  )
}

export default AdminLoginForm