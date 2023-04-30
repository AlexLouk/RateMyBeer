import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Styles.css'

function SubmitButton() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className='first' class='first'>
        <Button variant="primary" onClick={handleShow} > 
          Save Changes
        </Button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you really want to change the settings?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel Changes
          </Button>
          <Button variant="primary">Save Settings</Button> 
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default SubmitButton;