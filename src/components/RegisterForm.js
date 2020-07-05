import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import SpinningLoader from './SpinningLoader'
import Select from 'react-select'
import { reset, goodRegister, badRegister } from '../reducers/notificationReducer'
import userService from '../services/userService'
import { Form, Label, FormGroup, Button, Input, Modal, ModalBody, ModalFooter } from 'reactstrap'

const RegisterForm = (props) => {

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

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
    { value: 'male', label: 'male' },
    { value: 'female', label: 'female' },
    { value: 'trans-male', label: 'trans-male' },
    { value: 'trans-female', label: 'trans-female' },
    { value: 'queer', label: 'queer' },
    { value: 'other', label: 'other' }
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
  const submitRegister = async event => {
    event.preventDefault()
    toggle()
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
        }, 5000)
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
  }
  return (
    <div className='container' id='register-form'>
      {(loading) ?
        <div>
          <SpinningLoader />
        </div> :
        <div>
          <Button color="primary" onClick={toggle}>{'Sign up'}</Button>
          <Modal autoFocus={true} isOpen={modal} toggle={toggle} modalTransition={{ timeout: 300 }} >
            <ModalBody>
              <h2>Register</h2>
              <Form onSubmit={submitRegister}>
                <FormGroup>
                  <Label>Name:</Label>
                  <Input onChange={handleChangeName} value={name}></Input>
                  <Label>Username:</Label>
                  <Input onChange={handleChangeUsername} value={username}></Input>
                  <Label>Password:</Label> <Input id='password' type="password" onChange={handleChangePassword} value={password}></Input>
                  <Label>Confirm Password:</Label>
                  <Input onChange={handleChangeConfirmPassword} type='password' value={confirmPassword}></Input>
                  <Label>Gender:</Label> <Select options={genderOptions} value={selectedGender} onChange={handleChangeGender}></Select>
                  <Label>Email:</Label> <Input id='email' type="text" onChange={handleChangeEmail} value={email}></Input>
                  <Label>Date of Birth:</Label> <Input id='dateOfBirth' type="date" onChange={handleChangeDateOfBirth} value={dateOfBirth}></Input>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color='success' type='submit' onClick={submitRegister}>Sign Up!</Button>
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal></div>}
    </div >
  )
}

export default RegisterForm