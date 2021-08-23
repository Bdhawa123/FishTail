import React, { useEffect } from "react";
import { Modal, ModalBody, ModalHeader, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import SaleDataComponent from "./SaleDataComponent";

const MapProductToSales = ({ Sales }) => {
  const dispatch = useDispatch();
  const ItemList = useSelector((state) => state.dataReducer.items);
  useEffect(() => {
    console.log(Sales);
    console.log(Object.values(ItemList));
  }, []);
  return (
    <div>
      {Object.values(ItemList).map((items) =>
        items.map((item) => (
          <div>
            {Sales.map((sale) => {
              if (sale.ProductID === item.ProductID) {
                return (
                  <div>
                    <div>{item.ProductName}</div>
                    <div>{sale.SellingPrice}</div>
                  </div>
                );
              }
            })}
          </div>
        ))
      )}
    </div>
  );
};

const ModalSalesOpen = ({ modal, setModal, selectedSales }) => {
  useEffect(() => {
    if (selectedSales) {
      console.log(selectedSales);
    }
  });
  return (
    <Modal isOpen={modal} className="modalPart modal-lg">
      <ModalHeader
        toggle={() => {
          setModal(false);
        }}
      >
        Sales Item
      </ModalHeader>

      <ModalBody>
        <Col>
          <Row className="centerRow" />
        </Col>
      </ModalBody>
      <ModalBody>
        {selectedSales ? (
          <div>
            <div className="text-center">{selectedSales.SaleID}</div>
            <MapProductToSales Sales={selectedSales.Sales} />
            {/* <div>{selectedSales.}</div> */}
          </div>
        ) : null}
      </ModalBody>
    </Modal>
  );
};

export default ModalSalesOpen;
