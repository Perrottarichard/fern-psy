import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import ContactForm from './ContactForm';

const FormModal = () => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="primary" onClick={toggle}>{'Contact Fern'}</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <ContactForm />
        </ModalBody>
        <ModalFooter>
          <Button type='submit' color="primary" onClick={toggle}>Send</Button>{'  '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default FormModal;