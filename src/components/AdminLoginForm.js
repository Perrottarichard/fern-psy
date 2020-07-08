import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons';
import loginService from '../services/loginService'
import forumService from '../services/forumService'
import { setUser } from '../reducers/activeUserReducer'
import { Form, Label, FormGroup, Button, Input } from 'reactstrap'
import { toast } from 'react-toastify'

const textStyle = {
  textAlign: 'center',
  fontFamily: 'Montserrat',
  fontVariant: 'small-caps'
}
const formDivStyle = {
  fontFamily: 'Montserrat',
  fontVariant: 'small-caps',
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
  fontFamily: 'Montserrat'
}
const loginButtonStyle = {
  float: 'center',
  width: '200px',
  backgroundColor: '#28804b',
  fontFamily: 'Montserrat',
}
const iconStyle = {
  float: 'center'
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
      toast.warn('You must enter a username and password')
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
        setUsername('')
        setPassword('')
        history.push('/admin/dashboard')
      }
      catch (error) {
        console.log(error.message)
      }
    }
  }
  return (
    <div className='container' id='admin-login-form'>
      <div>
        <h2 style={textStyle}><FontAwesomeIcon icon={faLock} style={iconStyle} />{' '}Admin{' '}</h2>
      </div>
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