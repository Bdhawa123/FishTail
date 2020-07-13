import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const useEditInventory = (initialValues) => {
  const [val, setValues] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleChange = (event) => {
    console.log('HandleChange being called');
    // event.persist();
    console.log(typeof (event.target.value));
    setValues({ ...val, [event.target.name]: event.target.value });
  };


  const handleSubmit = (event) => {
    //event.preventDefault();
    fetch(`http://localhost:3030/api/Inventory/${val.ProductID}`, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(val),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          alert('Update Successful');
        } else {
          alert('Update unsuccessful');
        }
      })
      .catch((error) => {
        alert('Unsuccesful');
      });
  };

  const handleSubmitAddItem = (event) => {
    console.log(val);
    fetch('http://localhost:3030/api/Inventory', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(val),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          alert('Create Successful');
        } else {
          alert('Create unsuccessful');
        }
      })
      .catch((error) => {
        alert('Unsuccesful');
      });
  };


  return {
    handleChange, handleSubmit, handleSubmitAddItem, val,
  };
};

export default useEditInventory;
