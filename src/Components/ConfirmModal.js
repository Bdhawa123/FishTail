import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalFooter, Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { editItems, addItems, deleteItem } from "../redux/DataReducer";

const ConfirmModal = ({ confirmModal, setConfirmModal, action, item }) => {
  const [sendReq, setSendReq] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sendReq) {
      switch (action) {
        case "create":
          console.log(item);
          dispatch(addItems(item));
          break;

        case "edit":
          dispatch(editItems(item));
          break;

        case "delete":
          dispatch(deleteItem(item.ProductID));
          break;

        default:
          console.log("Confirm Modal Request unfulfilled");
          break;
      }
      setSendReq(false);
    }
  }, [sendReq]);

  const closeConfirmModal = (bool) => {
    setSendReq(bool);
    setConfirmModal(false);
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
            closeConfirmModal(true);
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
