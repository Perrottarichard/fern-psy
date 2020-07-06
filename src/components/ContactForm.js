import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Recaptcha from 'react-recaptcha'
import { Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
import { Container, Form, Label, Input, FormGroup, Button } from 'reactstrap'
import contactService from '../services/contactService'

const textStyle = {
  textAlign: 'center',
  fontFamily: 'Poppins'
}
const formDivStyle = {
  display: 'block',
  textAlign: 'center',
  marginTop: '50px'
}
const formStyle = {
  width: '90%',
  display: 'inline-block'
}
const labelStyle = {
  float: 'left',
  marginBottom: '0px',
  padding: '0px',
  fontFamily: 'Poppins'
}
const contactButtonStyle = {
  float: 'center',
  width: '200px',
  marginBottom: '20px'
}

const ContactForm = () => {
  const [isVerified, setIsVerified] = useState(false)
  const history = useHistory()
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
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          }
          if (!values.message) {
            errors.message = 'Required'
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={
          async (values, { setSubmitting, resetForm }) => {
            if (!isVerified) {
              alert('Please verify that you are a human')
            } else {
              const response = await contactService.sendContact(values)
              console.log(response.message)
              setSubmitting(false)
              resetForm({})
              history.push('/forum')
            }
          }
        }
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
            <Container style={formDivStyle}>
              <p style={{ fontFamily: 'Poppins' }}> We understand if you don't want to post on the forum just yet.  Instead, you can use this form to contact Fern privately, or add her on social media.</p>
              <div id='NavBarText'>
                <a href="mailto:furbynilu@gmail.com"> <FontAwesomeIcon id='fa-contact-form' icon={faEnvelopeSquare} />
                </a>
                <a href="https://www.facebook.com/NiluAcounselor"> <FontAwesomeIcon id='fa-contact-form' icon={faFacebookSquare} /></a>
              </div>
              <br />
              <h3 style={textStyle}>Enter your information: </h3>
              <Form style={formStyle} onSubmit={handleSubmit} className='form-ui'>
                <FormGroup style={{ marginBottom: '0' }}>
                  <Label style={labelStyle} for='name'>Name</Label>
                  <Input
                    type="Name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  /><br />
                  <Label style={labelStyle} for='email'>Email</Label>
                  <Input
                    placeholder='You@example.com'
                    type="Email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  /><br />
                  {errors.email && touched.email && errors.email}
                  <Label style={labelStyle} for='Line'>LINE</Label>
                  <Input
                    placeholder='Line ID'
                    type="Line"
                    name="LINE"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.LINE}
                  /><br />
                  <Label style={labelStyle} for='message'>Message</Label>
                  <Input
                    placeholder='I have a question about...'
                    type="Message"
                    name="message"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                  /><br />
                  {errors.message && touched.message && errors.message}
                </FormGroup>
                <Recaptcha sitekey='6LcL060ZAAAAABmkdF8vTezZgafAVQo1WoGgGNDT' render='explicit' onloadCallback={recaptchaLoaded} verifyCallback={verifyCallback} />
                <Button style={contactButtonStyle} type='submit' color='primary'>Send</Button><br />
              </Form>
            </Container>
          )}
      </Formik>
    </div>
  );
}

export default ContactForm;