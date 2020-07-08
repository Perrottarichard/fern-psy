import React, { useState } from 'react'
import Recaptcha from 'react-recaptcha'
import { useDispatch } from 'react-redux'
import { Form, Label, FormGroup, Button, Input, Modal, ModalBody, ModalFooter } from 'reactstrap'
import Select from 'react-select'
import SpinningLoader from './SpinningLoader'
import userService from '../services/userService'
import { toast } from 'react-toastify'

const textStyle = {
  textAlign: 'center',
  fontFamily: 'Montserrat'
}
const registerButtonStyle = {
  display: 'inline-block',
  fontFamily: 'Montserrat',
  float: 'center',
  width: '100px',
}
const formDivStyle = {
  display: 'block',
  textAlign: 'center',
  fontFamily: 'Montserrat'
}
const labelStyle = {
  float: 'left',
  marginBottom: '0px',
  padding: '0px',
  fontFamily: 'Montserrat'
}
const genderSelectStyle = {
  marginRight: '20px',
  float: 'left',
  fontFamily: 'Montserrat'
}

const RegisterForm = () => {

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false)

  const [isVerified, setIsVerified] = useState(false)

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [selectedGender, setSelectedGender] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const dispatch = useDispatch()

  const toggle = () => setModal(!modal);

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
  ]

  const handleChangeName = (event) => {
    setName(event.target.value)
  }
  const handleChangeUsername = (event) => {
    setUsername(event.target.value)
  }
  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }
  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }
  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value)
  }
  const handleChangeGender = (selectedGender) => {
    setSelectedGender(selectedGender)
  }
  const handleChangeDateOfBirth = (event) => {
    setDateOfBirth(event.target.value)
  }
  const recaptchaLoaded = () => {
    console.log('captcha loaded successfully')
  }
  const verifyCallback = (response) => {
    if (response) {
      setIsVerified(true);
    }
  }
  const variations = ['fern', 'Fern', 'admin', 'Admin', 'administrator', 'Administrator', 'nilubon', 'Nilubon', 'Fern-Admin', 'Fern-admin', 'fern-admin', 'fern-Admin', 'Fern Admin', 'fern Admin', 'Fern admin', 'fern admin', 'FernAdmin', 'fernAdmin', 'fern_admin', 'Fern_Admin']

  const submitRegister = async event => {
    event.preventDefault()
    if (variations.includes(username) || variations.map(v => v.toLowerCase).includes(username)) {
      toast.warn('Sorry, that username is restricted')
    }
    else if (!name || !username || !selectedGender || !dateOfBirth || !password) {
      toast.warn('You must fill all fields')
    }
    else if (password.length < 5 || username.length < 5) {
      toast.warn('Your username and password must be at least 5 characters long')
    }
    else if (password !== confirmPassword) {
      toast.warn('Your passwords are not the same. Try again.')
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      toast.warn('Your email address is not valid')
    }
    else if (!isVerified) {
      toast.warn('Please verify that you are a human')
    }

    else {
      //close modal
      toggle()
      try {
        setLoading(true)
        await userService.registerUser({ name, username, password, email, selectedGender, dateOfBirth })
        //dispatch
        setLoading(false)
        setUsername('')
        setPassword('')
        setConfirmPassword('')
        setName('')
        setSelectedGender('')
        setEmail('')
        setDateOfBirth('')
      }
      catch (error) {
        console.log(error)
        toast.error('Something went wrong...')
        setLoading(false)
      }
    }
  }

  return (
    <div className='container' id='register-form'>
      {
        (loading)
          ?
          <div>
            <SpinningLoader />
          </div>
          :
          <div style={formDivStyle}>
            <Button style={registerButtonStyle} color='secondary' onClick={toggle}>{'Sign up'}</Button>
            <Modal autoFocus={true} isOpen={modal} toggle={toggle} modalTransition={{ timeout: 300 }} >
              <ModalBody>
                <h2 style={textStyle}>Register</h2>
                <Form onSubmit={submitRegister} >
                  <FormGroup>
                    <Label style={labelStyle}>Name:</Label>
                    <Input onChange={handleChangeName} value={name}></Input><br />
                    <Label style={labelStyle}>Username:</Label>
                    <Input onChange={handleChangeUsername} value={username}></Input><br />
                    <Label style={labelStyle}>Password:</Label> <Input id='password' type="password" onChange={handleChangePassword} value={password}></Input><br />
                    <Label style={labelStyle}>Confirm Password:</Label>
                    <Input onChange={handleChangeConfirmPassword} type='password' value={confirmPassword}></Input><br />
                    <Label style={labelStyle}>Email:</Label> <Input id='email' type="text" onChange={handleChangeEmail} value={email}></Input><br />
                    <Label style={genderSelectStyle}>Gender:</Label><Select options={genderOptions} value={selectedGender} onChange={handleChangeGender}></Select><br />
                    <Label style={labelStyle}>Date of Birth:</Label> <Input id='dateOfBirth' type="date" onChange={handleChangeDateOfBirth} value={dateOfBirth}></Input><br />
                  </FormGroup>
                </Form>
              </ModalBody>
              <Recaptcha sitekey='6LcL060ZAAAAABmkdF8vTezZgafAVQo1WoGgGNDT' render='explicit' onloadCallback={recaptchaLoaded} verifyCallback={verifyCallback} />
              <ModalFooter>
                <Button type='submit' color='secondary' onClick={submitRegister}>Sign Up</Button>
                <Button onClick={toggle}>Cancel</Button>
              </ModalFooter>
            </Modal></div>
      }
    </div >
  )
}

export default RegisterForm