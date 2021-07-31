import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "reactstrap";
import { getItems, deleteItem } from "../../redux/DataReducer";
import { toggleBlur } from "../../redux/styleReducer";

import ConfirmModal from "../ConfirmModal";
import OpenItem from "./OpenItem";

let INITIAL_STATE = {
  ProductID: "",
  ProductName: "",
  CostPrice: "",
  SellingPrice: "",
  Quantity: "",
};

const DataComponent = () => {
  const [modal, OpenModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmValue, setConfirmValue] = useState(false);
  const [editID, setEditID] = useState(null);

  const dispatch = useDispatch();
  const items = useSelector((state) => state.dataReducer.items);
  const launchgetReq = useSelector(
    (state) => state.dataReducer.retriggerUpdate
  );

  useEffect(() => {
    dispatch(getItems());
    if (confirmValue === "delete") {
      dispatch(deleteItem(editID));
      setConfirmValue("");
    }
  }, [confirmValue, launchgetReq]);

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
    dispatch(toggleBlur());
    setItem(element);
    OpenModal(true);
    console.log(element);
  };

  const openConfirmModal = (id) => {
    setEditID(id);
    setConfirmModal(true);
    console.log("Open Confirm Modal is loaded");
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
          {items != null
            ? Object.values(items).map((item) =>
                item.map((element) => (
                  <tr key={element._id}>
                    <td>{element.ProductID}</td>
                    <td>{element.ProductName}</td>
                    <td>{element.CostPrice}</td>
                    <td>{element.SellingPrice}</td>
                    <td>{element.Quantity}</td>
                    <Button
                      color="info"
                      onClick={() => {
                        openModal(element);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      color="danger"
                      onClick={() => {
                        openConfirmModal(element.ProductID);
                      }}
                    >
                      Del
                    </Button>
                  </tr>
                ))
              )
            : null}
        </tbody>
      </Table>

      <ConfirmModal
        confirmModal={confirmModal}
        setConfirmVal={setConfirmValue}
        setConfirmModal={setConfirmModal}
        action="delete"
      />
      <OpenItem
        OpenModal={OpenModal}
        modal={modal}
        initialItemObj={INITIAL_STATE}
      />
    </div>
  );
};

export default DataComponent;
