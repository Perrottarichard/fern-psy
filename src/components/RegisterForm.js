import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import SpinningLoader from './SpinningLoader'
import { reset, goodRegister, badRegister } from '../reducers/notificationReducer'
import userService from '../services/userService'
import forumService from '../services/forumService'
import { setUser } from '../reducers/userReducer'
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
  const [gender, setGender] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')

  const dispatch = useDispatch()

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
  const handleChangeGender = (event) => {
    setGender(event.target.value)
  }
  const handleChangeDateOfBirth = (event) => {
    setDateOfBirth(event.target.value)
  }
  const submitRegister = async event => {
    event.preventDefault()
    setLoading(true)
    toggle()
    if (password !== confirmPassword) {
      dispatch(badRegister())
      setTimeout(() => {
        dispatch(reset())
      }, 3000);
      throw new Error('passwords are not the same')
    }
    try {
      const user =
        await userService.registerUser({ name, username, password, email, gender, dateOfBirth })
      window.localStorage.setItem(
        'loggedForumUser', JSON.stringify(user)
      )
      forumService.setToken(user.token)
      dispatch(setUser(user))
      setLoading(false)
      dispatch(goodRegister())
      setTimeout(() => {
        dispatch(reset())
      }, 5000)
      setUsername('')
      setPassword('')
      setConfirmPassword('')
      setName('')
      setGender('')
      setEmail('')
      setDateOfBirth('')
      console.log(user)
    }
    catch (error) {
      console.log(error)
      setLoading(false)
      dispatch(badRegister())
      setTimeout(() => {
        dispatch(reset())
      }, 3000)
    }
  }
  return (
    <div className='container'>
      {(loading) ? <SpinningLoader /> :
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
                  <Label>Gender:</Label> <Input id='gender' type="text" onChange={handleChangeGender} value={gender}></Input>
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