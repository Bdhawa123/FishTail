import React, { useContext, useState, useEffect } from "react";
import {
  Card,
  Col,
  Row,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Form,
  Data,
} from "reactstrap";
import "../../styles/sales.css";
import DataComponent from "./DataComponent";
import { StyleContext } from "../../contexts/StyleContext";
import { DataContext } from "../../contexts/DataContext";
import useEditInventory from "../../Forms/InventoryForm";
import ConfirmModal from "../ConfirmModal";

/**
 * TO DO
 * 1. Edit request
 * 2. Delete request
 * 3. Pagination
 * 4. Validation
 */

const INITIAL_STATE = {
  ProductID: "",
  ProductName: "",
  CostPrice: "",
  SellingPrice: "",
  Quantity: "",
};

const Inventory = ({ history }) => {
  const { toggleBlur } = useContext(StyleContext);
  const { getData } = useContext(DataContext);

  const {
    handleChange,
    handleSubmitAddItem,
    handleDeleteItem,
    val,
  } = useEditInventory(INITIAL_STATE);
  const [modal, OpenModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmValue, setConfirmValue] = useState(false);

  useEffect(() => {
    if (confirmValue === "create") {
      handleSubmitAddItem();
      setConfirmValue("");
      closeModal();
      getData();
    }
    //console.log('Inventory');
  }, [confirmValue]);

  const openModal = () => {
    toggleBlur();
    OpenModal(true);
  };

  const closeModal = () => {
    toggleBlur();
    OpenModal(false);
  };

  const Submit = (event) => {
    event.preventDefault();
    setConfirmModal(true);
  };

  return (
    <div className="txtImport">
      <Card>
        <div className="topRow">
          <h1>Inventory</h1>
          <Button
            color="primary"
            onClick={() => {
              history.push("/Home");
            }}
          >
            back
          </Button>
        </div>
      </Card>

      <Card className="container card2">
        <Row>
          <Button color="primary" onClick={openModal}>
            Add New
          </Button>
        </Row>

        <Row className="centerRow">
          <input type="text" placeholder="Search" />
        </Row>
        {/* DataComponent --- mongodb data */}
        <Row className="dataComponent">
          <DataComponent handleDeleteItem={handleDeleteItem} />
        </Row>
      </Card>

      {/* Modal should either have values already filled according to state
          As of now the modal doesn't show what is the initial state
          The initial state should either be preserved in the form or
          shown accordingly. */}

      <Modal isOpen={modal} className="modalPart modal-lg">
        <ModalHeader toggle={closeModal}>Product Entry</ModalHeader>
        <Form>
          <ModalBody className="centerRow">
            <div>
              <Row className="center-vertical">
                <Col xs="4">Product Id:</Col>
                <Col xs="6">
                  <input
                    type="text"
                    placeholder="Prodcut ID"
                    onChange={handleChange}
                    name="ProductID"
                    value={val.ProductID}
                  />
                </Col>
              </Row>
              <Row className="center-vertical">
                <Col xs="4">Item Name</Col>
                <Col xs="6">
                  <input
                    type="text"
                    placeholder="Product Name"
                    onChange={handleChange}
                    name="ProductName"
                    value={val.ProductName}
                  />
                </Col>
              </Row>

              <Row className="center-vertical">
                <Col xs="4">Cost Price</Col>
                <Col xs="6">
                  <input
                    type="text"
                    placeholder="Cost Price"
                    onChange={handleChange}
                    name="CostPrice"
                    value={val.CostPrice}
                  />
                </Col>
              </Row>

              <Row className="center-vertical">
                <Col xs="4">Selling Price</Col>
                <Col xs="6">
                  <input
                    type="text"
                    placeholder="Selling Price"
                    onChange={handleChange}
                    name="SellingPrice"
                    value={val.SellingPrice}
                  />
                </Col>
              </Row>

              <Row className="center-vertical">
                <Col xs="4">Quantity</Col>
                <Col xs="6">
                  <input
                    type="text"
                    placeholder="Quantity"
                    onChange={handleChange}
                    name="Quantity"
                    value={val.Quantity}
                  />
                </Col>
              </Row>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={Submit}>
              Confirm
            </Button>
            <Button color="danger" onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

      <ConfirmModal
        confirmModal={confirmModal}
        setConfirmVal={setConfirmValue}
        setConfirmModal={setConfirmModal}
        action="create"
      />
      {/* <NoticeModal message={noticeMessage} isOpen={confirmModal} toggleConfirm={setConfirmModal} /> */}
    </div>
  );
};

export default Inventory;
