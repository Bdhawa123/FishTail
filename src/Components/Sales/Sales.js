import React, { Component, useContext, useState } from "react";
import {
  Card,
  Row,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Table,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { toggleBlur } from "../../redux/styleReducer";
import TypeAheadSales from "./typeAheadSales";

import "../../styles/sales.css";

const SalesComponent = (props) => {
  const dispatch = useDispatch();
  const [modal, OpenModal] = useState(false);
  const [productList, setSaleList] = useState([]);

  const openModal = () => {
    dispatch(toggleBlur());
    OpenModal(true);
  };

  const closeModal = () => {
    dispatch(toggleBlur());
    OpenModal(false);
  };

  const listUpdate = (item) => {
    if (productList.length) {
      let bool = false;

      for (let i = 0; i < productList.length; i = +1) {
        if (Number(productList[i].ProductID) === Number(item.ProductID)) {
          bool = true;
          break;
        }
      }
      if (!bool) {
        setSaleList([...productList, item]);
      }
    } else {
      setSaleList([...productList, item]);
    }
  };

  return (
    <div className="txtImport">
      <Card>
        <div className="topRow">
          <h1>Sales</h1>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              props.history.push("/Home");
            }}
          >
            back
          </button>
        </div>
      </Card>

      <Card className="container card2">
        <Row>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              openModal();
            }}
          >
            New
          </button>
        </Row>

        <Row className="centerRow">
          <TypeAheadSales title="search" />
        </Row>
        <Row className="dataComponent">
          {/* <DataComponent data={null} /> */}
        </Row>
      </Card>

      <Modal isOpen={modal} className="modalPart modal-lg">
        {/* <h3>Add </h3>
                <button className="btn btn-danger modalClose" onClick = {()=>closeModal()}> <span aria-hidden="true">&times;</span></button> */}
        <ModalHeader
          toggle={() => {
            closeModal();
          }}
        >
          Sales Entry
        </ModalHeader>
        <ModalBody className="centerRow ">
          {/* <input type="text" placeholder="enter Id" className="centerRow" /> */}
          <Row>
            <TypeAheadSales title="enter Id" listUpdate={listUpdate} />
          </Row>
          <Row>
            <Table>
              {Object.values(productList).map((product) => (
                <tr>
                  <td>{product.ProductName}</td>
                  <td>{product.SellingPrice}</td>
                </tr>
              ))}
            </Table>
          </Row>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              closeModal();
            }}
          >
            Confirm
          </Button>
          <Button
            color="danger"
            onClick={() => {
              closeModal();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default SalesComponent;
