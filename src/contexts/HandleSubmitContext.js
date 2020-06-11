import React, { createContext, useState, useEffect } from 'react';


export const HandleSubmitContext = createContext();

const HandleSubmitContextProvider = (props) => {
  const [val, setValues] = useState({});
  const [result, setresult] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
  });

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
    submiturl(url);
  };


  return (
    <HandleSubmitContext.Provider value={{
      handleChange, setInitialState, handleSubmit, val, result,
    }}
    >
      {props.children}
    </HandleSubmitContext.Provider>
  );
};


export default HandleSubmitContextProvider;
