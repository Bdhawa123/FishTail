import React, { createContext, useState, useEffect } from 'react';


export const HandleSubmitContext = createContext();

const HandleSubmitContextProvider = (props) => {
  const [val, setValues] = useState({});
  const [result, setresult] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
  }, [val]);

  const handleChange = (event) => {
    setValues({ ...val, [event.target.name]: event.target.value });
  };

  const setInitialState = (InitialStateObj) => {
    setValues(InitialStateObj);
  };


  const submiturl = (url) => {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(val),
      headers: { 'Content-Type': 'application/json;charset=utf-8' },

    })
      .then((response) => {
        console.log(response);
        setresult(response.ok);
      })
      .catch((error) => {
        // setresult(false);
      });
  };

  const handleSubmit = (event, url) => {
    event.preventDefault();
    console.log('value from handlesubmitcontext');
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(val),
      headers: { 'Content-Type': 'application/json;charset=utf-8' },

    })
      .then((response) => {
        console.log(response);
        setresult(response.ok);
      })
      .catch((error) => {
        // setresult(false);
      });
  };

  const handleEditSubmit = (event, url) => {
    event.preventDefault();
    fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(val),
      headers: { 'Content-Type': 'application/json;charset=utf-8' },

    })
      .then((response) => {
        setresult(response.ok);
      })
      .catch((error) => {
        // setresult(false);
      });
  };


  return (
    <HandleSubmitContext.Provider value={{
      handleChange, setInitialState, handleSubmit, handleEditSubmit, val, result,
    }}
    >
      {props.children}
    </HandleSubmitContext.Provider>
  );
};


export default HandleSubmitContextProvider;
