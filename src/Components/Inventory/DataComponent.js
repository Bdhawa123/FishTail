import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "reactstrap";
import { getItems } from "../../redux/DataReducer";
import { toggleBlur } from "../../redux/styleReducer";

import ConfirmModal from "../ConfirmModal";
import EntryModal from "./EntryModal";

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

  const dispatch = useDispatch();
  const items = useSelector((state) => state.dataReducer.items);
  const launchgetReq = useSelector(
    (state) => state.dataReducer.retriggerUpdate
  );

  useEffect(() => {
    dispatch(getItems());
  }, [launchgetReq]);

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
  };

  const openConfirmModal = (element) => {
    setItem(element);
    setConfirmModal(true);
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
                        openConfirmModal(element);
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
        setConfirmModal={setConfirmModal} //boolean to toggleConfirm Modal
        action="delete"
        item={INITIAL_STATE}
      />
      <EntryModal
        OpenModal={OpenModal}
        modal={modal}
        initialItemObj={INITIAL_STATE}
        modalTitle="Edit Product"
        action="edit"
      />
    </div>
  );
};

export default DataComponent;
