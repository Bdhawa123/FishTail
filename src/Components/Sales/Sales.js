import React, { useState } from "react";
import {
  Card,
  Row,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Col,
} from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { toggleBlur } from "../../redux/styleReducer";
import TypeAheadSales from "./typeAheadSales";
import { addItem, createSales, getSalesList } from "../../redux/ItemReducer";
import SalesItemList from "./SalesItemList";
import SaleDataComponent from "./SaleDataComponent";

import "../../styles/sales.css";

const SalesComponent = (props) => {
  const dispatch = useDispatch();
  const ItemList = useSelector((state) => state.itemReducer.ItemList);
  const triggerUpdate = useSelector(
    (state) => state.itemReducer.retriggerUpdate
  );

  const [modal, OpenModal] = useState(false);
  // TO DO LIST
  // Pagination
  // React cache and memoization concept addition --Advanced
  // Authentication system
  // Confirm Action Modal and alert successful
  // TypeAhead for Sales and Data Component
  // Form Validation

  //

  useState(() => {
    dispatch(getSalesList());
  }, [triggerUpdate]);

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
      if (item.count > 0) {
        OBJECTMODAL.ProductID = item.ProductID;
        OBJECTMODAL.CostPrice = item.CostPrice;
        OBJECTMODAL.SellingPrice = item.SellingPrice;
        OBJECTMODAL.Quantity = item.count;
        RefinedSelectedItems.push({ ...OBJECTMODAL });
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
          <SaleDataComponent />
        </Row>
      </Card>

      {/* Data Modal */}

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
