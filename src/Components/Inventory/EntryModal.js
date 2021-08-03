import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Row,
  Col,
  Button,
} from "reactstrap";

import { useDispatch } from "react-redux";
import useEditInventory from "../../Forms/InventoryForm";
import ConfirmModal from "../ConfirmModal";
import { toggleBlur } from "../../redux/styleReducer";

const EntryModal = ({
  OpenModal,
  modal,
  initialItemObj,
  modalTitle,
  action,
}) => {
  const [inventoryItem] = useState(initialItemObj);
  const { handleChange, handleSubmit, val } = useEditInventory(initialItemObj);

  const [confirmModal, setConfirmModal] = useState(false);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(toggleBlur());
    OpenModal(false);
  };

  const submit = () => {
    setConfirmModal(true);
    closeModal();
  };

  return (
    <div>
      <Modal isOpen={modal}>
        <ModalHeader toggle={closeModal}>{modalTitle}</ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ModalBody className="centerRow">
            <div>
              <Row className="center-vertical">
                <Col xs="4">Product Id:</Col>
                <Col xs="6">
                  <input
                    type="text"
                    name="ProductID"
                    disabled={modalTitle === "Edit Product"}
                    placeholder={inventoryItem.ProductID}
                    onChange={handleChange}
                    value={val.ProductID}
                  />
                </Col>
              </Row>
              <Row className="center-vertical">
                <Col xs="4">Item Name</Col>
                <Col xs="6">
                  <input
                    type="text"
                    name="ProductName"
                    placeholder={inventoryItem.ProductName}
                    onChange={handleChange}
                    value={val.ProductName}
                  />
                </Col>
              </Row>

              <Row className="center-vertical">
                <Col xs="4">Cost Price</Col>
                <Col xs="6">
                  <input
                    type="text"
                    name="CostPrice"
                    placeholder={inventoryItem.CostPrice}
                    onChange={handleChange}
                    value={val.CostPrice}
                  />
                </Col>
              </Row>

              <Row className="center-vertical">
                <Col xs="4">Selling Price</Col>
                <Col xs="6">
                  <input
                    type="text"
                    name="SellingPrice"
                    placeholder={inventoryItem.SellingPrice}
                    onChange={handleChange}
                    value={val.SellingPrice}
                  />
                </Col>
              </Row>

              <Row className="center-vertical">
                <Col xs="4">Quantity</Col>
                <Col xs="6">
                  <input
                    type="text"
                    name="Quantity"
                    placeholder={inventoryItem.Quantity}
                    onChange={handleChange}
                    value={val.Quantity}
                  />
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Form>

        <ModalFooter>
          <Button color="primary" onClick={submit}>
            Confirm
          </Button>
          <Button color="danger" onClick={closeModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <ConfirmModal
        confirmModal={confirmModal}
        setConfirmModal={setConfirmModal}
        action={action}
        item={val}
      />
    </div>
  );
};

export default EntryModal;
