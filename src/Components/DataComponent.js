import React, { useContext, useState, useEffect } from 'react';
import {
  Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Form,
} from 'reactstrap';
import { DataContext } from '../contexts/DataContext';
import { StyleContext } from '../contexts/StyleContext';
import { HandleSubmitContext } from '../contexts/HandleSubmitContext';

let INITIAL_STATE = {
  ProductID: '',
  ProductName: '',
  CostPrice: '',
  SellingPrice: '',
  Quantity: '',
};

const DataComponent = ({ data }) => {
  const [modal, OpenModal] = useState(false);
  const [confirmModal, toggleConfirmModal] = useState(false);
  const [inventoryItem, fillitem] = useState([]);
  const { blur, toggleBlur } = useContext(StyleContext);
  const {
    handleChange, setInitialState, val, result, handleEditSubmit,
  } = useContext(HandleSubmitContext);


  // Need to rename thiss

  useEffect(() => {

  }, []);

  const setItem = (Obj) => {
    let JsonObj = {
      ProductID: Obj.ProductID,
      ProductName: Obj.ProductName,
      CostPrice: Obj.CostPrice,
      SellingPrice: Obj.SellingPrice,
      Quantity: Obj.Quantity,
    };

    INITIAL_STATE = JSON.stringify(JsonObj);
    console.log(INITIAL_STATE);
  };


  const openModal = (ID) => {
    toggleBlur();
    OpenModal(true);
    console.log(ID);
    fetch(`http://localhost:3030/api/Inventory/${ID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((response) => {
        //this item is getting loaded
        console.log(response.Item[0]);
        fillitem(response.Item[0]);
        setItem(response.Item[0]);
      });
  };


  const closeModal = () => {
    toggleBlur();
    OpenModal(false);
  };

  const openConfirmModal = () => {
    toggleBlur();
    toggleConfirmModal(true);
    console.log('Open Confirm Modal is loaded');
  };

  const closeConfirmModal = () => {
    toggleBlur();
    toggleConfirmModal(false);
  };


  const OpenItem = () => (
    <Modal isOpen={modal}>
      <ModalHeader toggle={() => { closeModal(); }}>Edit Item</ModalHeader>
      <Form onSubmit={handleEditSubmit}>
        <ModalBody className="centerRow">
          <div>
            <Row className="center-vertical">
              <Col xs="4">
                Product Id:
              </Col>
              <Col xs="6">
                <input type="text" placeholder={inventoryItem.ProductID} disabled />
              </Col>
            </Row>
            <Row className="center-vertical">
              <Col xs="4">
                Item Name
              </Col>
              <Col xs="6">
                <input type="text" placeholder={inventoryItem.ProductName} name="ProductName" onChange={handleChange} value={val.ProductName} />
              </Col>
            </Row>

            <Row className="center-vertical">
              <Col xs="4">
                Cost Price
              </Col>
              <Col xs="6">
                <input type="text" placeholder={inventoryItem.CostPrice} name="CostPrice" onChange={handleChange} />
              </Col>
            </Row>

            <Row className="center-vertical">
              <Col xs="4">
                Selling Price
              </Col>
              <Col xs="6">
                <input type="text" placeholder={inventoryItem.SellingPrice} name="SellingPrice" onChange={handleChange} />
              </Col>
            </Row>

            <Row className="center-vertical">
              <Col xs="4">
                Quantity
              </Col>
              <Col xs="6">
                <input type="text" placeholder={inventoryItem.Quantity} name="Quantity" onChange={handleChange} />
              </Col>
            </Row>
          </div>
        </ModalBody>
      </Form>

      <ModalFooter>
        <Button color="primary" onClick={openConfirmModal}>Confirm</Button>
        <Button color="danger" onClick={() => { closeModal(); }}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );

  const Confirm = () => (
    <Modal isOpen={confirmModal}>
      <ModalHeader toggle={() => { closeConfirmModal(); }}>Confirm Action</ModalHeader>
      Are you sure ?
      <ModalFooter>
        <Button color="primary" onClick={openConfirmModal}>Confirm</Button>
        <Button color="danger" onClick={() => { closeConfirmModal(); }}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Cost Price</th>
            <th>Selling Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {(data != null) ? (Object.values(data)).map((item) => (
            item.map((element) => (
              <tr key={element._id}>
                <td>{element.ProductID}</td>
                <td>{element.ProductName}</td>
                <td>{element.CostPrice}</td>
                <td>{element.SellingPrice}</td>
                <td>{element.Quantity}</td>
                <Button color="info" onClick={() => { openModal(element.ProductID); }}>Edit</Button>
                <Button color="danger" onClick={() => { openConfirmModal(); }}>Del</Button>
              </tr>
            )))) : null}
        </tbody>
      </Table>
      <Confirm />
      <OpenItem />
    </div>
  );
};

export default DataComponent;
