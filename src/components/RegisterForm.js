import React, { useState } from 'react'
import Recaptcha from 'react-recaptcha'
import { Form, Label, FormGroup, Button, Input, Modal, ModalBody, ModalFooter } from 'reactstrap'
import userService from '../services/userService'
import { toast } from 'react-toastify'


const textStyle = {
  textAlign: 'center',
  fontFamily: 'Kanit'
}
const registerButtonStyle = {
  display: 'inline-block',
  fontFamily: 'Kanit',
  float: 'center',
  width: '100px',

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

const RegisterForm = () => {

  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  React.useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, [isLoading])

  const toggle = () => setModal(!modal);



  // const genderOptions = [
  //   { value: 'ชาย', label: 'ชาย' },
  //   { value: 'หญิง', label: 'หญิง' },
  //   { value: 'ชายรักชาย', label: 'ชายรักชาย' },
  //   { value: 'หญิงรักหญิง', label: 'หญิงรักหญิง' },
  //   { value: 'อื่นๆ', label: 'อื่นๆ' }
  // ]

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }
  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }
  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value)
  }

  const recaptchaLoaded = () => {
    console.log('captcha loaded successfully')
  }
  const verifyCallback = (response) => {
    if (response) {
      setIsVerified(true)
    }
  }

  const submitRegister = async event => {
    event.preventDefault()

 if (!password) {
      toast.warn('You must have a password', { autoClose: 5000 })
    }
    else if (password !== confirmPassword) {
      toast.warn('กรุณายืนยัน password ให้ถูกต้อง')
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      toast.warn('กรุณากรอก Email ให้ถูกต้อง')
    }
    else if (!isVerified) {
      toast.warn('Confirm reCaptcha')
    }
    else {
      setIsLoading(true)
      setTimeout(() => {
        toggle()
      }, 1500);
      try {
        await userService.registerUser({ password, email})
        toast.success('สำเร็จแล้ว คุณสามารถล็อคอินและตั้งกระทู้ถามได้เลยค่ะ')
        setPassword('')
        setConfirmPassword('')
        setEmail('')
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
        <Button style={registerButtonStyle} outline color='primary' onClick={toggle}>{'สมัครเลย'}</Button>
        <Modal autoFocus={true} isOpen={modal} toggle={toggle} modalTransition={{ timeout: 300 }} >
          <ModalBody>
            <h2 style={textStyle}>สมัครเข้าใช้งาน</h2>
            <Form onSubmit={submitRegister} >
              <FormGroup>
              <Label style={labelStyle}>Email:</Label> <Input id='email' type="text" onChange={handleChangeEmail} value={email}></Input><br />
                <Label style={labelStyle}>Password (ภาษาอังกฤษ 8-20 ตัวอักษร)</Label> <Input id='password' type="password" onChange={handleChangePassword} value={password}></Input><br />
                <Label style={labelStyle}>ยืนยัน Password:</Label>
                <Input onChange={handleChangeConfirmPassword} type='password' value={confirmPassword}></Input><br />
              </FormGroup>
            </Form>
          </ModalBody>
          <Recaptcha
            sitekey='6LcL060ZAAAAABmkdF8vTezZgafAVQo1WoGgGNDT'
            render='explicit'
            hl='th'
            onloadCallback={recaptchaLoaded}
            verifyCallback={verifyCallback}
          />
          <ModalFooter>
            <Button color='primary' style={{ fontFamily: 'Kanit' }} type='submit' onClick={submitRegister}>สมัครเลย</Button>
            <Button style={{ fontFamily: 'Kanit' }} onClick={toggle}>ยกเลิก</Button>
          </ModalFooter>
        </Modal></div>
    </div >
  )
}

export default RegisterForm