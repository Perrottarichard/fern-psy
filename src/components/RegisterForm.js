import React, { useState } from 'react'
import Recaptcha from 'react-recaptcha'
import { Form, Label, FormGroup, Button, Input, Modal, ModalBody, ModalFooter } from 'reactstrap'
import Select from 'react-select'
import userService from '../services/userService'
import { toast } from 'react-toastify'
import LoaderButton from './LoaderButton'

const textStyle = {
  textAlign: 'center',
  fontFamily: 'Kanit'
}
const registerButtonStyle = {
  display: 'inline-block',
  fontFamily: 'Kanit',
  float: 'center',
  width: '100px',
  borderColor: '#343a40',
  borderWidth: '3px',
}
const formDivStyle = {
  display: 'block',
  textAlign: 'center',
  fontFamily: 'Kanit'
}
const labelStyle = {
  float: 'left',
  marginBottom: '0px',
  padding: '0px',
  fontFamily: 'Kanit'
}
const genderSelectStyle = {
  marginRight: '20px',
  float: 'left',
  fontFamily: 'Kanit'
}

const RegisterForm = () => {

  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [selectedGender, setSelectedGender] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')


  React.useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, [isLoading])

  const toggle = () => setModal(!modal);



  const genderOptions = [
    { value: 'ชาย', label: 'ชาย' },
    { value: 'หญิง', label: 'หญิง' },
    { value: 'ชายรักชาย', label: 'ชายรักชาย' },
    { value: 'หญิงรักหญิง', label: 'หญิงรักหญิง' },
    { value: 'อื่นๆ', label: 'อื่นๆ' }
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
      toast.warn('ขออภัยค่ะ ชื่อนี้มีผู้ใช้งานแล้ว')
    }
    else if (!name || !username || !selectedGender || !dateOfBirth || !password) {
      toast.warn('กรุณากรอกข้อมูลให้ครบถ้วน')
    }
    else if (!/^(?=.{5,16}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i.test(username)) {
      toast.warn('Username ต้องเป็นภาษาอังกฤษ ความยาวอย่างน้อย 5-16 ตัวอักษร และไม่ใช้อักขระพิเศษ ', { autoClose: 5000 })
    }
    else if (!/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i.test(password)) {
      toast.warn('Password ต้องเป็นภาษาอังกฤษ ความยาวอย่างน้อย 8-20 ตัวอักษร และไม่ใช้อักขระพิเศษ', { autoClose: 5000 })
    }
    else if (password !== confirmPassword) {
      toast.warn('กรุณายืนยัน password ให้ถูกต้อง')
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      toast.warn('กรุณากรอก Email ให้ถูกต้อง')
    }
    else if (!isVerified) {
      toast.warn('กรุณาเช็คในกล่องยืนยันว่าคุณไม่ใช่โปรแกรมหุ่นยนต์')
    }
    else {
      setIsLoading(true)
      setTimeout(() => {
        toggle()
      }, 1500);
      try {
        await userService.registerUser({ name, username, password, email, selectedGender, dateOfBirth })
        toast.success('สำเร็จแล้ว คุณสามารถล็อคอินและตั้งกระทู้ถามได้เลยค่ะ')
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
        toast.error('มีข้อผิดพลาด กรุณาลองใหม่ค่ะ')
      }
    }
  }

  return (
    <div className='container' id='register-form'>
      <div style={formDivStyle}>
        <Button style={registerButtonStyle} color='primary' onClick={toggle}>{'สมัครเลย'}</Button>
        <Modal autoFocus={true} isOpen={modal} toggle={toggle} modalTransition={{ timeout: 300 }} >
          <ModalBody>
            <h2 style={textStyle}>สมัครเข้าใช้งาน</h2>
            <Form onSubmit={submitRegister} >
              <FormGroup>
                <Label style={labelStyle}>ชื่อ:</Label>
                <Input onChange={handleChangeName} value={name}></Input><br />
                <Label style={labelStyle}>Username: กรุณากรอกเป็นภาษาอังกฤษ</Label>
                <Input onChange={handleChangeUsername} value={username}></Input><br />
                <Label style={labelStyle}>Password: กรุณากรอกเป็นภาษาอังกฤษ</Label> <Input id='password' type="password" onChange={handleChangePassword} value={password}></Input><br />
                <Label style={labelStyle}>ยืนยัน Password:</Label>
                <Input onChange={handleChangeConfirmPassword} type='password' value={confirmPassword}></Input><br />
                <Label style={labelStyle}>Email:</Label> <Input id='email' type="text" onChange={handleChangeEmail} value={email}></Input><br />
                <Label style={genderSelectStyle}>เพศ:</Label><Select options={genderOptions} value={selectedGender} onChange={handleChangeGender}></Select><br />
                <Label style={labelStyle}>วันเกิด:</Label> <Input id='dateOfBirth' type="date" onChange={handleChangeDateOfBirth} value={dateOfBirth}></Input><br />
              </FormGroup>
            </Form>
          </ModalBody>
          <Recaptcha sitekey='6LcL060ZAAAAABmkdF8vTezZgafAVQo1WoGgGNDT' render='explicit' onloadCallback={recaptchaLoaded} verifyCallback={verifyCallback} />
          <ModalFooter>
            <LoaderButton type='submit' onClick={submitRegister}>สมัครเลย</LoaderButton>
            <Button style={{ fontFamily: 'Kanit', height: '43px' }} onClick={toggle}>ยกเลิก</Button>
          </ModalFooter>
        </Modal></div>
    </div >
  )
}

export default RegisterForm