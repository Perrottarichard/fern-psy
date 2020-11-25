import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from "react-toastify"
import { Button } from 'reactstrap'
import { setUser } from '../reducers/activeUserReducer'
import loginService from '../services/loginService'
import forumService from '../services/forumService'

import { Form, Label, FormGroup, Input } from 'reactstrap'
import RegisterForm from './RegisterForm'

const textStyle = {
  textAlign: 'center',
  fontFamily: 'Kanit',
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
  fontFamily: 'Kanit',
  color: 'black'
}
const loginButtonStyle = {
  float: 'center',
  width: '100px',
  fontFamily: 'Kanit'
}

const LoginForm = (props) => {
  const { setLoggedIn } = props
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  React.useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, [isLoading])

  const handleChangeUser = (event) => {
    setUsername(event.target.value)
  }
  const handleChangePass = (event) => {
    setPassword(event.target.value)
  }
  const submitLogin = async event => {
    event.preventDefault()
    if (!username || !password) {
      toast.warn('กรุณาใส่ username และ password')
    }
    else {
      try {
        const user = await loginService.userlogin({ username, password })
        window.localStorage.setItem(
          'loggedForumUser', JSON.stringify(user)
        )
        forumService.setToken(user.token)
        dispatch(setUser(user))
        toast.info(`ยินดีต้อนรับ คุณ ${user.username}`)
        setLoggedIn(true)
        setUsername('')
        setPassword('')
        history.push('/')
      }
      catch (error) {
        console.log(error.message)
        if (error.message.includes('401')) {
          toast.error('กรุณาตรวจสอบความถูกต้องของ username และ password')
        } else {
          toast.error('มีข้อผิดพลาด')
        }
      }
    }
  }
  return (
    <div className='container' id='login-form'>
      <h2 style={textStyle}>เข้าสู่ระบบ</h2>
      <div id='form-div' style={formDivStyle}>
        <Form style={formStyle} onSubmit={submitLogin}>
          <FormGroup>
            <Label style={labelStyle}>Username:</Label>
            <Input onChange={handleChangeUser} value={username}></Input><br />
            <Label style={labelStyle}>Password:</Label> <Input id='password' type="password" onChange={handleChangePass} value={password}></Input><br />
            <Button color='primary' style={loginButtonStyle} id='submit-login' type="submit">เข้าสู่ระบบ</Button>
          </FormGroup>
        </Form>
      </div>
      <br />
      <hr />
      <div id='no-account-div'>
        <p style={textStyle}>ยังไม่มีแอคเคาท์ คลิกที่นี่</p>
        <RegisterForm />
      </div>
    </div>
  )
}

export default LoginForm