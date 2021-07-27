import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import '../../css/auth.css';

const ChangePassword: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {
    setShowModal(!showModal);
  };
  const resetForm = () => {
    setShowModal(false);
  };
  return (
    <>
      <Modal className="Auth-Modal" show={showModal} onHide={resetForm}>
        <Modal.Header className="Auth-Modal_header" closeButton>
          <Modal.Title className="Auth-Modal_title">Log In</Modal.Title>
        </Modal.Header>

        <Form>
          <Modal.Body>
            <Form.Group className="groupInput">
              <Form.Label className="iconInput">
                <FontAwesomeIcon icon={faUnlockAlt} />
              </Form.Label>
              <Form.Control
                className="Auth-Modal_input"
                type="password"
                placeholder="Current password"
                name="currentPassword"
              ></Form.Control>
            </Form.Group>

            <Form.Group className="groupInput">
              <Form.Label className="iconInput">
                <FontAwesomeIcon icon={faUnlockAlt} />
              </Form.Label>
              <Form.Control
                className="Auth-Modal_input"
                type="password"
                placeholder="New password"
              ></Form.Control>
            </Form.Group>

            <Form.Group className="groupInput">
              <Form.Label className="iconInput">
                <FontAwesomeIcon icon={faUnlockAlt} />
              </Form.Label>
              <Form.Control
                className="Auth-Modal_input"
                type="password"
                placeholder="Re-enter password"
              ></Form.Control>
            </Form.Group>

            <div className="Auth-Modal_button">
              <Button className="" variant="primary" type="submit">
                Change Password
              </Button>
            </div>
          </Modal.Body>
        </Form>
      </Modal>

      <Button onClick={handleClick}>Change Password</Button>
    </>
  );
};

export default ChangePassword;
