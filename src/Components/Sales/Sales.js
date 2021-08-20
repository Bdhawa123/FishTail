import React, { Component, useContext, useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";

import { toggleBlur } from "../../redux/styleReducer";
import TypeAheadSales from "./typeAheadSales";
import { addItem, createSales } from "../../redux/ItemReducer";

import "../../styles/sales.css";
import Col from "reactstrap/lib/Col";
import SalesItemList from "./SalesItemList";

const SalesComponent = (props) => {
  const dispatch = useDispatch();
  const ItemList = useSelector((state) => state.itemReducer.ItemList);

  const [modal, OpenModal] = useState(false);
  // const changeItem = useSelector((state) => state.itemReducer.changed);

  const openModal = () => {
    dispatch(toggleBlur());
    OpenModal(true);
  };

  const closeModal = () => {
    dispatch(toggleBlur());
    OpenModal(false);
  };

  const listUpdate = (item) => {
    dispatch(addItem(item));
  };

  const sendReqCreate = () => {
    let RefinedSelectedItems = [];
    let ProductList = Object.values(ItemList);
    let OBJECTMODAL = {
      ProductID: "",
      CostPrice: "",
      SellingPrice: "",
      Quantity: "",
    };
    ProductList.map((item) => {
      // count >0
      //count change to Quantity
      if (item.count > 0) {
        OBJECTMODAL.ProductID = item.ProductID;
        OBJECTMODAL.CostPrice = item.CostPrice;
        OBJECTMODAL.SellingPrice = item.SellingPrice;
        OBJECTMODAL.Quantity = item.count;
        RefinedSelectedItems.push(OBJECTMODAL);
      }
    });

    dispatch(createSales(RefinedSelectedItems));
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
                <SalesItemList productList={ItemList} />
              </Col>
            </Row>
          </Col>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              sendReqCreate();
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
