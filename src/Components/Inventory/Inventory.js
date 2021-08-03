import React, { useContext, useState, useEffect } from "react";
import {
  Card,
  Col,
  Row,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Form,
  Data,
} from "reactstrap";
import "../../styles/sales.css";
import { useDispatch, useSelector } from "react-redux";
import DataComponent from "./DataComponent";
import useEditInventory from "../../Forms/InventoryForm";
import ConfirmModal from "../ConfirmModal";
import { toggleBlur } from "../../redux/styleReducer";
import EntryModal from "./EntryModal";

/**
 * TO DO
 * 1. Edit request
 * 2. Delete request
 * 3. Pagination
 * 4. Validation
 */

const INITIAL_STATE = {
  ProductID: "",
  ProductName: "",
  CostPrice: "",
  SellingPrice: "",
  Quantity: "",
};

const Inventory = ({ history }) => {
  const dispatch = useDispatch();

  const { val } = useEditInventory(INITIAL_STATE);
  const [modal, OpenModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  // const [confirmValue, setConfirmValue] = useState(false);

  // useEffect(() => {}, [confirmModal]);

  const openModal = () => {
    dispatch(toggleBlur());
    OpenModal(true);
  };

  const closeModal = () => {
    dispatch(toggleBlur());
    OpenModal(false);
  };

  const Submit = (event) => {
    event.preventDefault();
    closeModal(false);
    setConfirmModal(true);
  };

  return (
    <div className="txtImport">
      <Card>
        <div className="topRow">
          <h1>Inventory</h1>
          <Button
            color="primary"
            onClick={() => {
              history.push("/Home");
            }}
          >
            back
          </Button>
        </div>
      </Card>

      <Card className="container card2">
        <Row>
          <Button color="primary" onClick={openModal}>
            Add New
          </Button>
        </Row>

        <Row className="centerRow">
          <input type="text" placeholder="Search" />
        </Row>
        {/* DataComponent --- mongodb data */}
        <Row className="dataComponent">
          <DataComponent />
        </Row>
      </Card>

      {/* Modal should either have values already filled according to state
          As of now the modal doesn't show what is the initial state
          The initial state should either be preserved in the form or
          shown accordingly. */}
      <EntryModal
        OpenModal={OpenModal}
        modal={modal}
        initialItemObj={INITIAL_STATE}
        modalTitle="Product Entry"
        action="create"
      />

      <ConfirmModal
        confirmModal={confirmModal}
        setConfirmModal={setConfirmModal}
        action="create"
        item={val}
      />
    </div>
  );
};

export default Inventory;
