import React, { Component, useContext, useState } from 'react';
import {
  Card, Col, Row, Modal, ModalBody, ModalHeader, ModalFooter, Button,
} from 'reactstrap';
import '../styles/sales.css';
import DataComponent from './DataComponent';
import { StyleContext } from '../contexts/StyleContext';
import { DataContext } from '../contexts/DataContext';


// const { blur, toggleBlur } = useContext(StyleContext);

const Inventory = ({ history }) => {
  const { blur, toggleBlur } = useContext(StyleContext);
  const { items } = useContext(DataContext);
  const [modal, OpenModal] = useState(false);

  const openModal = () => {
    toggleBlur();
    OpenModal(true);
  };

  const closeModal = () => {
    toggleBlur();
    OpenModal(false);
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
          <Button color="primary" onClick={() => { openModal(); }}>
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

      <Modal isOpen={modal} className="modalPart modal-lg">
        <ModalHeader toggle={() => { closeModal(); }}>Product Entry</ModalHeader>
        <ModalBody className="centerRow">
          <div>
            <Row className="center-vertical">
              <Col xs="4">
                Product Id:
              </Col>
              <Col xs="6">
                <input type="text" placeholder="enter Id" />
              </Col>
            </Row>
            <Row className="center-vertical">
              <Col xs="4">
                Item Name
              </Col>
              <Col xs="6">
                <input type="text" placeholder="enter Id" />
              </Col>
            </Row>

            <Row className="center-vertical">
              <Col xs="4">
                Cost Price
              </Col>
              <Col xs="6">
                <input type="text" placeholder="enter Id" />
              </Col>
            </Row>

            <Row className="center-vertical">
              <Col xs="4">
                Selling Price
              </Col>
              <Col xs="6">
                <input type="text" placeholder="enter Id" />
              </Col>
            </Row>

            <Row className="center-vertical">
              <Col xs="4">
                Quantity
              </Col>
              <Col xs="6">
                <input type="text" placeholder="enter Id" />
              </Col>
            </Row>
          </div>
        </ModalBody>


        <ModalFooter>
          <Button color="primary" onClick={() => { closeModal(); }}>Confirm</Button>
          <Button color="danger" onClick={() => { closeModal(); }}>Cancel</Button>
        </ModalFooter>

      </Modal>
    </div>
  );
};

export default Inventory;
