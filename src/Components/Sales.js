import React, { Component, useContext, useState } from 'react';
import {
  Card, Row, Modal, ModalBody, ModalHeader, ModalFooter, Button,
} from 'reactstrap';
import '../styles/sales.css';
import DataComponent from './DataComponent';
import { StyleContext } from '../contexts/StyleContext';
import { DataContext } from '../contexts/DataContext';

// const {blur,toggleBlur} = useContext(StyleContext);

const SalesComponent = (props) => {
  const { blur, toggleBlur } = useContext(StyleContext);
  const { items } = useContext(DataContext);
  console.log(blur.blurState);


  const [modal, OpenModal] = useState(false);
  console.log(`modal${modal}`);


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
          <h1>Sales</h1>
          <button className="btn btn-primary" onClick={() => { props.history.push('/Home'); }}>
            back
          </button>
        </div>
      </Card>

      <Card className="container card2">
        <Row>
          <button className="btn btn-primary" onClick={() => { openModal(); }}>
            New
          </button>
        </Row>

        <Row className="centerRow">
          <input type="text" placeholder="Search" />
        </Row>
        <Row className="dataComponent">
          <DataComponent data={null} />
        </Row>
      </Card>

      <Modal isOpen={modal} className="modalPart modal-lg">
        {/* <h3>Add </h3>
                <button className="btn btn-danger modalClose" onClick = {()=>closeModal()}> <span aria-hidden="true">&times;</span></button> */}
        <ModalHeader toggle={() => { closeModal(); }}>Sales Entry</ModalHeader>
        <ModalBody className="centerRow ">
          <input type="text" placeholder="enter Id" className="centerRow" />
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => { closeModal(); }}>Confirm</Button>
          <Button color="danger" onClick={() => { closeModal(); }}>Cancel</Button>
        </ModalFooter>

      </Modal>
    </div>
  );
};

export default SalesComponent;
