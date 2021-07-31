import React, { useEffect } from "react";
import { Modal, ModalHeader, ModalFooter, Button } from "reactstrap";

const ConfirmModal = ({
  confirmModal,
  setConfirmVal,
  setConfirmModal,
  action,
}) => {
  useEffect(() => {});

  const closeConfirmModal = (val) => {
    setConfirmModal(false);
    setConfirmVal(val);
  };

  return (
    <Modal isOpen={confirmModal}>
      <ModalHeader
        toggle={() => {
          closeConfirmModal(false);
        }}
      >
        Confirm Action
      </ModalHeader>
      Are you sure ?
      <ModalFooter>
        <Button
          color="primary"
          onClick={() => {
            closeConfirmModal(action);
          }}
        >
          Confirm
        </Button>
        <Button
          color="danger"
          onClick={() => {
            closeConfirmModal(false);
          }}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default ConfirmModal;
