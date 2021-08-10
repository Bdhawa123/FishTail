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
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { toggleBlur } from "../../redux/styleReducer";
import TypeAheadSales from "./typeAheadSales";

import "../../styles/sales.css";
import Col from "reactstrap/lib/Col";

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
    if (productList.every((product) => product.ProductID !== item.ProductID)) {
      setSaleList((list) => [...list, item]);
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
        <ModalBody>
          <Col>
            <Row className="centerRow">
              <TypeAheadSales title="enter Id" listUpdate={listUpdate} />
            </Row>
            <Row>
              <Col>
                <Table>
                  {Object.values(productList).map((product) => {
                    product = { ...product, Quantity: 0 };
                    return (
                      <tr>
                        <td>{product.ProductID}</td>
                        <td>{product.ProductName}</td>
                        <td>{product.SellingPrice}</td>
                        <td>
                          <AddIcon
                            onClick={() => {
                              product.Quantity += 1;
                              console.log(product);
                            }}
                          />
                        </td>
                        <td>{product.Quantity}</td>
                        <td>
                          <RemoveIcon />
                        </td>
                        {console.log(product)}
                      </tr>
                    );
                  })}
                </Table>
              </Col>
            </Row>
          </Col>
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
