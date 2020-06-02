import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

const DataContextProvider = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3030/api/Inventory', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result.data);
          setItems(result.data);
        },
      )
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const getallData = () => fetch('localhost:3030/api/Inventory')
  //   .then((res) => {
  //     console.log(res);
  //     return res.json();
  //   });

  // // let getData = getallData();
  // const [Data, setData] = useState(
  //   {
  //     data: 'data',
  //   },
  // );


  // const toggleData = () => {
  //   setData({ Data: getallData() });
  // };

  return (
    <DataContext.Provider value={{ items }}>{props.children }</DataContext.Provider>
  );
};

export default DataContextProvider;
