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
  const [email, setEmail] = useState('')
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

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }
  const handleChangePass = (event) => {
    setPassword(event.target.value)
  }
  const submitLogin = async event => {
    event.preventDefault()
    if (!email || !password) {
      toast.warn('กรุณาใส่ email และ password')
    }
    else {
      try {
        const user = await loginService.userlogin({ email, password })
        window.localStorage.setItem(
          'loggedForumUser', JSON.stringify(user)
        )
        forumService.setToken(user.token)
        dispatch(setUser(user))
        setLoggedIn(true)
        setEmail('')
        setPassword('')
        history.push('/')
      }
      catch (error) {
        console.log(error.message)
        if (error.message.includes('401')) {
          toast.error('กรุณาตรวจสอบความถูกต้องของ email และ password')
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
            <Label style={labelStyle}>Email:</Label>
            <Input onChange={handleChangeEmail} value={email}></Input><br />
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