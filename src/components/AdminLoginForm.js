import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons';
import loginService from '../services/loginService'
import forumService from '../services/forumService'
import { setUser } from '../reducers/activeUserReducer'
import { Button, TextField } from '@material-ui/core'

const AdminLoginForm = (props) => {
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
      // toast.warn('You must enter a username and password')
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
        setUsername('')
        setPassword('')
        history.push('/adDash')
      }
      catch (error) {
        console.log(error.message)
        if (error.message.includes('401')) {
          // toast.warn('check your username and password again')
        }
      }
    }
  }
  return (
    <div className='container' id='admin-login-form'>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <h2 ><FontAwesomeIcon icon={faLock}  />{' '}Admin{' '}</h2>
      </div>
      <div id='form-div' style={{display: 'flex', justifyContent: 'center'}} >
        <form onSubmit={submitLogin} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>

            <TextField 
            onChange={handleChangeUser} 
            value={username}
            variant="outlined"
            margin="normal"
            required
            style={{width: 280}}
            label='Username'
            >
            </TextField>

            <TextField 
            id='password' 
            type="password" 
            onChange={handleChangePass} 
            value={password}
            variant="outlined"
            margin="normal"
            required
            style={{width: 280}}
            label='Password'
            >
            </TextField>

            <Button 
            id='admin-submit-login' 
            type="submit"
            variant='contained'
            style={{width: 200, alignSelf:'center', marginTop: 20}}
            >
              Enter
            </Button>
        </form>
      </div>
    </div>
  )
}

export default AdminLoginForm