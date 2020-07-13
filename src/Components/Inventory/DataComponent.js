import React, { useContext, useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import { DataContext } from '../../contexts/DataContext';
import { StyleContext } from '../../contexts/StyleContext';
import ConfirmModal from '../ConfirmModal';
import OpenItem from './OpenItem';

let INITIAL_STATE = {
  ProductID: '',
  ProductName: '',
  CostPrice: '',
  SellingPrice: '',
  Quantity: '',
};

const DataComponent = () => {
  const [modal, OpenModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmValue, setConfirmValue] = useState(false);
  const [editID, setEditID] = useState(null);
  const { items } = useContext(DataContext);
  const { toggleBlur } = useContext(StyleContext);

  useEffect(() => {
    if (confirmValue === 'delete') {
      fetch(`http://localhost:3030/api/Inventory/${editID}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          console.log(response);
          if (response.ok) {
            alert('Delete Successful');
          } else {
            alert('Delete unsuccessful');
          }
        })
        .catch((error) => {
          alert('Unsuccesful');
        });
      setConfirmValue('');
    }
  }, [confirmValue]);


  const setItem = (Obj) => {
    let JsonObj = {
      ProductID: Obj.ProductID,
      ProductName: Obj.ProductName,
      CostPrice: Obj.CostPrice,
      SellingPrice: Obj.SellingPrice,
      Quantity: Obj.Quantity,
    };
    INITIAL_STATE = JsonObj;
  };

  const openModal = (element) => {
    toggleBlur();
    setItem(element);
    OpenModal(true);
    console.log(element);
  };

  const openConfirmModal = (id) => {
    setEditID(id);
    setConfirmModal(true);
    console.log('Open Confirm Modal is loaded');
    /**
     * Confirm Modal --> ???
     */
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
          {(items != null) ? (Object.values(items)).map((item) => (
            item.map((element) => (
              <tr key={element._id}>
                <td>{element.ProductID}</td>
                <td>{element.ProductName}</td>
                <td>{element.CostPrice}</td>
                <td>{element.SellingPrice}</td>
                <td>{element.Quantity}</td>
                <Button color="info" onClick={() => { openModal(element); }}>Edit</Button>
                <Button color="danger" onClick={() => { openConfirmModal(element.ProductID); }}>Del</Button>
              </tr>
            )))) : null}
        </tbody>
      </Table>
      <ConfirmModal confirmModal={confirmModal} setConfirmVal={setConfirmValue} setConfirmModal={setConfirmModal} action="delete" />
      <OpenItem OpenModal={OpenModal} modal={modal} toggleBlur={toggleBlur} initialItemObj={INITIAL_STATE} />
    </div>
  );
};

export default DataComponent;
