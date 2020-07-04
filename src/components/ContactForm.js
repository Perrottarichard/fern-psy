import React from 'react';
import { Formik } from 'formik';
import { Form, Label, Input, FormGroup } from 'reactstrap'

const ContactForm = () => (
  <div>
    <h5>Enter your information: </h5>
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
      onSubmit={(values, { setSubmitting }) => {
        console.log('submit clicked do something')
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
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
          <Form onSubmit={handleSubmit} action="mailto:perrottarichard@gmail.com" className='form-ui'>
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input
                placeholder='Jane'
                type="Name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <Label for='email'>Email</Label>
              <Input
                placeholder='Jane@example.com'
                type="Email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <Label for='Line'>LINE</Label>
              <Input
                placeholder='Line ID'
                type="Line"
                name="LINE"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.LINE}
              />
              <Label for='message'>Message</Label>
              <Input
                placeholder='I have a question about...'
                type="Message"
                name="message"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message}
              />
              {errors.message && touched.message && errors.message}
            </FormGroup>
          </Form>
        )}
    </Formik>
  </div>
);

export default ContactForm;