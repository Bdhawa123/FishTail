import React, { useContext, useState, useEffect } from 'react';
import {
  Table, Button, Modal, ModalHeader,
} from 'reactstrap';
import { DataContext } from '../contexts/DataContext';
import { StyleContext } from '../contexts/StyleContext';

const DataComponent = ({ data }) => {
  const [modal, OpenModal] = useState(false);
  const [confirmModal, toggleConfirmModal] = useState(false);
  const [inventoryItem, fillitem] = useState([]);
  const { blur, toggleBlur } = useContext(StyleContext);

  useEffect(() => {
    console.log(inventoryItem);
  });

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
      .then((result) => {
        //this item is getting loaded
        console.log(result.Item[0]);
        fillitem(result.Item[0]);
      })
      .then(console.log(`Inventory Item${inventoryItem}`)); //this isn't getting loaded
  };

  const closeModal = () => {
    toggleBlur();
    OpenModal(false);
  };

  const openConfirmModal = () => {
    toggleBlur();
    toggleConfirmModal(true);
  };
  const closeConfirmModal = () => {
    toggleBlur();
    toggleConfirmModal(false);
  };


  const Confirm = () => {
    console.log('Confirm Tag');
    return (
      <Modal isOpen={modal}>
        <ModalHeader toggle={() => { closeModal(); }}>Edit Item</ModalHeader>
        Edit modal need to build
      </Modal>
    );
  };

  const OpenProduct = () => {
    console.log('Open Product');
    return (
      <Modal isOpen={confirmModal}>
        <ModalHeader toggle={() => { closeConfirmModal(); }}>Confirm Action</ModalHeader>
        Are you sure ?
      </Modal>
    );
  };

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
              <tr>
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
      <OpenProduct />
    </div>
  );
};

export default DataComponent;
