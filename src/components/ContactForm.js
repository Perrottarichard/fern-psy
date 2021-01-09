import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Recaptcha from 'react-recaptcha'
import { Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
import { Container, Input} from '@material-ui/core'
import contactService from '../services/contactService'
import LoaderButton from './LoaderButton'

const textStyle = {
  textAlign: 'center',
  fontFamily: 'Kanit',
  fontVariant: 'small-caps'
}
const formDivStyle = {
  display: 'block',
  textAlign: 'center',
  marginTop: '50px',
  fontFamily: 'Kanit',
}
const formStyle = {
  width: '90%',
  display: 'inline-block'
}
const labelStyle = {
  float: 'left',
  marginBottom: '0px',
  padding: '0px',
  fontFamily: 'Kanit',
  fontVariant: 'small-caps'
}
const contactButtonStyle = {
  float: 'center',
  width: '150px',
  borderColor: '#343a40',
  borderWidth: '3px',
  borderStyle: 'solid',
  marginBottom: '20px',
  fontFamily: 'Kanit',
  backgroundColor: '#288046'
}

const ContactForm = () => {
  // eslint-disable-next-line no-unused-vars
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()

  React.useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, [isLoading])

  const recaptchaLoaded = () => {
    console.log('captcha loaded successfully')
  }
  const verifyCallback = (response) => {
    if (response) {
      setIsVerified(true);
    }
  }
  return (
    <div>
      <Formik
        initialValues={{ name: '', email: '', LINE: '', message: '' }}
        onSubmit={
          async (values, { setSubmitting, resetForm }) => {
            if (!values.name) {
              // toast.warn('ชื่อของคุณ')
            }
            else if (!values.email) {
              // toast.warn('ต้องระบุอีเมล')
            }
            else if (!values.message) {
              // toast.warn('เขียนข้อความ')
            }
            else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              // toast.warn('อีเมลไม่ถูกต้อง')
            }
            else if (!isVerified) {
              // toast.warn('Confirm reCaptcha')
            }
            else {
              setIsLoading(true)
              await contactService.sendContact(values)
              // toast.success('ส่งข้อความ')
              setSubmitting(false)
              resetForm({})
              history.push('/')
            }
          }
        }
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
            <Container style={formDivStyle}>
              <p style={{
                fontFamily: 'Kanit'
              }}> ไม่อยากให้คนอื่นเห็นคำถามของคุณใช่ไหม? ส่งข้อความส่วนตัวถามได้เหมือนกันค่ะ</p>
              <div id='NavBarText'>
                <a href="mailto:furbynilu@gmail.com"> <FontAwesomeIcon id='fa-contact-form' icon={faEnvelopeSquare} />
                </a>
                <a href="https://www.facebook.com/NiluAcounselor"> <FontAwesomeIcon id='fa-contact-form' icon={faFacebookSquare} /></a>
              </div>
              <br />
              <h5 style={textStyle}>กรอกแบบฟอร์มเพื่อส่งคำถาม</h5>
              <form style={formStyle} onSubmit={handleSubmit} className='form-ui'>
                  <p style={labelStyle} for='name'>ชื่อของคุณ</p>
                  <Input
                    type="Name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  /><br />
                  <p style={labelStyle} for='email'>อีเมล</p>
                  <Input
                    placeholder='You@example.com'
                    type="Email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  /><br />
                  <p style={labelStyle} for='Line'>LINE</p>
                  <Input
                    placeholder='Line ID'
                    type="Line"
                    name="LINE"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.LINE}
                  /><br />
                  <p style={labelStyle} for='message'>ข้อความ</p>
                  <Input
                    placeholder='ฉันมีคำถามเกี่ยวกับ ...'
                    type="Message"
                    name="message"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                  /><br />
                <Recaptcha
                  sitekey='6LcL060ZAAAAABmkdF8vTezZgafAVQo1WoGgGNDT'
                  render='explicit'
                  onloadCallback={recaptchaLoaded}
                  verifyCallback={verifyCallback}
                  hl='th'
                />
                <LoaderButton style={contactButtonStyle} type='submit' >ส่งข้อความ</LoaderButton><br />
              </form>
            </Container>
          )}
      </Formik>
    </div>
  );
}

export default ContactForm;