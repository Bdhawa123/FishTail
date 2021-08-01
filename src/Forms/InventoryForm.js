import React, { useState, useEffect } from "react";

const useEditInventory = (initialValues) => {
  const [val, setValues] = useState("");

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleChange = (event) => {
    console.log("HandleChange being called");
    // event.persist();
    console.log(typeof event.target.value);
    setValues({ ...val, [event.target.name]: event.target.value });
  };

  return {
    handleChange,
    val,
  };
};

export default useEditInventory;
