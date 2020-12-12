import React, { createContext, useState, useEffect } from "react";

export const DataContextNew = createContext();

const DataContextNewProvider = (props) => {
  const [items, setItems] = useState([]);
  const [refreshmonitor, setRefreshMonitor] = useState("");

  const getData = () => {
    fetch("http://localhost:3030/api/Inventory", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.data);
        setItems(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <DataContextNew.Provider
      value={{
        items,
        getData,
      }}
    >
      {props.children}
    </DataContextNew.Provider>
  );
};

export default DataContextNewProvider;
