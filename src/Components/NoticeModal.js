import React, { useState, useEffect } from 'react';
import {
  Modal, ModalBody, ModalHeader, ModalFooter, Button, Form,
} from 'reactstrap';

const NoticeModal = ({ message, isOpen, toggleConfirm }) => {
  const toggleModal = () => {
    toggleConfirm(false);
    isOpen = true;
  };

  return (
  /**
       * Need to update style component for the modal
       */
    <div>
      <Modal isOpen={isOpen}>
        <ModalHeader toggle={toggleModal}>Product Entry</ModalHeader>
        <ModalBody>{message}</ModalBody>
      </Modal>
    </div>
  );
};
export default NoticeModal;
