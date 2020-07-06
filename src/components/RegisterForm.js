import React, { useState } from 'react'
import Recaptcha from 'react-recaptcha'
import { useDispatch } from 'react-redux'
import SpinningLoader from './SpinningLoader'
import Select from 'react-select'
import { reset, goodRegister, badRegister } from '../reducers/notificationReducer'
import userService from '../services/userService'
import { Form, Label, FormGroup, Button, Input, Modal, ModalBody, ModalFooter } from 'reactstrap'

//align sign up button
const textStyle = {
  textAlign: 'center',
  fontFamily: 'Poppins'
}
const registerButtonStyle = {
  display: 'inline-block'
}
const formDivStyle = {
  display: 'block',
  textAlign: 'center'
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
const genderSelectStyle = {
  marginRight: '20px',
  float: 'left',
  fontFamily: 'Poppins'
}

const RegisterForm = () => {

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  //captcha value
  const [isVerified, setIsVerified] = useState(false)

  const [loading, setLoading] = useState(false)

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [selectedGender, setSelectedGender] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')

  const dispatch = useDispatch()

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
  const submitRegister = async event => {
    event.preventDefault()
    //check captcha
    if (isVerified) {
      toggle() //close modal
      //validate field info
      if (!name || !username || !selectedGender || !dateOfBirth || !password) {
        dispatch(badRegister('You must fill all fields'))
        setTimeout(() => {
          dispatch(reset())
        }, 5000)
      }
      else if (password.length < 5 || username.length < 5) {
        dispatch(badRegister('Your username and password must be at least 5 characters long'))
        setTimeout(() => {
          dispatch(reset())
        })
      }
      else if (password !== confirmPassword) {
        dispatch(badRegister('You passwords are not the same. Try again.'))
        setTimeout(() => {
          dispatch(reset())
        }, 5000);
      }
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        dispatch(badRegister('Your email address is not valid'))
        setTimeout(() => {
          dispatch(reset())
        }, 5000)
      }
      else {
        try {
          setLoading(true)
          await userService.registerUser({ name, username, password, email, selectedGender, dateOfBirth })
          setLoading(false)
          dispatch(goodRegister())
          setTimeout(() => {
            dispatch(reset())
          }, 4000)
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
          setLoading(false)
          dispatch(badRegister(error.message))
          setTimeout(() => {
            dispatch(reset())
          }, 3000)
        }
      }
    } else {
      alert('Please verify that you are a human')
    }
  }

  return (
    <div className='container' id='register-form'>
      {(loading) ?
        <div>
          <SpinningLoader />
        </div> :
        <div style={formDivStyle}>
          <Button style={registerButtonStyle} color="primary" onClick={toggle}>{'Sign up'}</Button>
          <Modal autoFocus={true} isOpen={modal} toggle={toggle} modalTransition={{ timeout: 300 }} >
            <ModalBody>
              <h2 style={textStyle}>Register</h2>
              <Form onSubmit={submitRegister} >

                <FormGroup>
                  <Label style={labelStyle}>Name:</Label>
                  <Input style={inputStyle} onChange={handleChangeName} value={name}></Input>
                  <Label style={labelStyle}>Username:</Label>
                  <Input style={inputStyle} onChange={handleChangeUsername} value={username}></Input>
                  <Label style={labelStyle}>Password:</Label> <Input style={inputStyle} id='password' type="password" onChange={handleChangePassword} value={password}></Input>
                  <Label style={labelStyle}>Confirm Password:</Label>
                  <Input style={inputStyle} onChange={handleChangeConfirmPassword} type='password' value={confirmPassword}></Input>
                  <Label style={labelStyle}>Email:</Label> <Input style={inputStyle} id='email' type="text" onChange={handleChangeEmail} value={email}></Input>
                  <Label style={genderSelectStyle}>Gender:</Label><Select options={genderOptions} value={selectedGender} onChange={handleChangeGender}></Select><br />
                  <Label style={labelStyle}>Date of Birth:</Label> <Input style={inputStyle} id='dateOfBirth' type="date" onChange={handleChangeDateOfBirth} value={dateOfBirth}></Input>
                </FormGroup>
              </Form>
            </ModalBody>
            <Recaptcha sitekey='6LcL060ZAAAAABmkdF8vTezZgafAVQo1WoGgGNDT' render='explicit' onloadCallback={recaptchaLoaded} verifyCallback={verifyCallback} />
            <ModalFooter>
              <Button color='primary' type='submit' onClick={submitRegister}>Sign Up</Button>
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal></div>}
    </div >
  )
}

export default RegisterForm