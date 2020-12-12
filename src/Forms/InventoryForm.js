import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../contexts/DataContext";

const useEditInventory = (initialValues) => {
  const [val, setValues] = useState("");
  const [refresh, setRefresh] = useState("");
  const [result, setResult] = useState("");
  const { getData } = useContext(DataContext);

  useEffect(() => {
    setRefresh(false);
    setValues(initialValues);
  }, [initialValues, refresh]);

  const handleChange = (event) => {
    console.log("HandleChange being called");
    // event.persist();
    console.log(typeof event.target.value);
    setValues({ ...val, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    //event.preventDefault();
    fetch(`http://localhost:3030/api/Inventory/${val.ProductID}`, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(val),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          alert("Update Successful");
          getData();
        } else {
          alert("Update unsuccessful");
        }
      })
      .catch((error) => {
        alert("Unsuccesful");
      });
  };

  const handleSubmitAddItem = (event) => {
    console.log(val);
    fetch("http://localhost:3030/api/Inventory", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(val),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          setRefresh(true);
          alert("Create Successful");
          getData();
        } else {
          alert("Create unsuccessful");
        }
      })
      .catch((error) => {
        alert("Unsuccesful");
      });
  };

  const handleDeleteItem = (ID) => {
    fetch(`http://localhost:3030/api/Inventory/${ID}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          alert("Delete Successful");
          getData();
        } else {
          alert("Delete unsuccessful");
        }
      })
      .catch((error) => {
        alert("Unsuccesful");
      });
    // setConfirmValue("");
  };

  return {
    handleChange,
    handleSubmit,
    handleSubmitAddItem,
    handleDeleteItem,
    val,
  };
};

export default useEditInventory;
