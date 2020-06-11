import React, {
  Component, useContext, useState, useEffect,
} from 'react';
import {
  Card, Col, Row, Modal, ModalBody, ModalHeader, ModalFooter, Button, Form,
} from 'reactstrap';
import '../styles/sales.css';
import DataComponent from './DataComponent';
import NoticeModal from './NoticeModal';
import { StyleContext } from '../contexts/StyleContext';
import { DataContext } from '../contexts/DataContext';
import { HandleSubmitContext } from '../contexts/HandleSubmitContext';

/**
 * TO DO
 * 1. Edit request
 * 2. Delete request
 * 3. Pagination
 * 4. Validation
 */

const INITIAL_STATE = {
  ProductID: '',
  ProductName: '',
  CostPrice: '',
  SellingPrice: '',
  Quantity: '',
};


const Inventory = ({ history }) => {
  const { toggleBlur } = useContext(StyleContext);
  const { items } = useContext(DataContext);
  const {
    handleChange, handleSubmit, setInitialState, val, result,
  } = useContext(HandleSubmitContext);
  let noticeMessage = 'Request was unsuccessful';

  const [modal, OpenModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const url = 'http://localhost:3030/api/Inventory';


  useEffect(() => {
    setInitialState(INITIAL_STATE);
  }, [INITIAL_STATE, confirmModal]);

  const openModal = () => {
    toggleBlur();
    OpenModal(true);
  };

  const closeModal = () => {
    toggleBlur();
    OpenModal(false);
  };

  const submitProduct = (event) => {
    closeModal();
    setConfirmModal(true);
    handleSubmit(event, url);
    if (result) {
      noticeMessage = 'Successfully submitted';
    } else {
      noticeMessage = 'Request failed';
    }
  };

  return (
    <div className="txtImport">
      <Card>
        <div className="topRow">
          <h1>Inventory</h1>
          <Button color="primary" onClick={() => { history.push('/Home'); }}>
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
        <Row className="dataComponent">
          <DataComponent data={items} />
        </Row>
      </Card>

      {/* Modal should either have values already filled according to state
          As of now the modal doesn't show what is the initial state
          The initial state should either be preserved in the form or
          shown accordingly. */}

      <Modal isOpen={modal} className="modalPart modal-lg">
        <ModalHeader toggle={closeModal}>Product Entry</ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ModalBody className="centerRow">
            <div>
              <Row className="center-vertical">
                <Col xs="4">
                  Product Id:
                </Col>
                <Col xs="6">
                  <input type="text" placeholder={val.ProductId} id="id" name="ProductID" onChange={handleChange} />
                </Col>
              </Row>
              <Row className="center-vertical">
                <Col xs="4">
                  Item Name
                </Col>
                <Col xs="6">
                  <input type="text" placeholder={val.ItemName} id="name" name="ProductName" onChange={handleChange} />
                </Col>
              </Row>

              <Row className="center-vertical">
                <Col xs="4">
                  Cost Price
                </Col>
                <Col xs="6">
                  <input type="text" placeholder={val.CostPrice} id="cp" name="CostPrice" onChange={handleChange} />
                </Col>
              </Row>

              <Row className="center-vertical">
                <Col xs="4">
                  Selling Price
                </Col>
                <Col xs="6">
                  <input type="text" placeholder={val.SellingPrice} id="sp" name="SellingPrice" onChange={handleChange} />
                </Col>
              </Row>

              <Row className="center-vertical">
                <Col xs="4">
                  Quantity
                </Col>
                <Col xs="6">
                  <input type="text" placeholder={val.Quantity} id="quantity" name="Quantity" onChange={handleChange} />
                </Col>
              </Row>
            </div>
          </ModalBody>


          <ModalFooter>
            <Button color="primary" onClick={submitProduct}>Confirm</Button>
            <Button color="danger" onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </Form>

      </Modal>
      <NoticeModal message={noticeMessage} isOpen={confirmModal} toggleConfirm={setConfirmModal} />
    </div>
  );
};

export default Inventory;
