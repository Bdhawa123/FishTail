import React, { useEffect } from "react";
import { Modal, ModalBody, ModalHeader, Row, Col } from "reactstrap";
import { useSelector } from "react-redux";
import "../../styles/modalSalesOpen.css";

const MapProductToSales = ({ Sales }) => {
  const ItemList = useSelector((state) => state.dataReducer.items);

  useEffect(() => {
    console.log(Sales);
  });

  return (
    <div className="mapProductSales">
      {Object.values(ItemList).map((items) =>
        items.map((item) => (
          <div>
            {Sales.map((sale) => {
              if (sale.ProductID === item.ProductID) {
                return (
                  <div className="saleSingleItem">
                    <div>{item.ProductID}</div>
                    <div>{item.ProductName}</div>
                    <div>{sale.SellingPrice}</div>
                    <div>{sale.Quantity}</div>
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
    <Modal isOpen={modal} className="modalPart modal-lg mt-4">
      <ModalHeader
        toggle={() => {
          setModal(false);
        }}
      >
        Sales Item
      </ModalHeader>
      <ModalBody>
        {selectedSales ? (
          <div>
            <div className="selectedSaleTitle">
              <div>{selectedSales.SaleID}</div>
              <div>
                {new Date(selectedSales.createdAt).toLocaleDateString()}
              </div>
            </div>
            <MapProductToSales Sales={selectedSales.Sales} />
          </div>
        ) : null}
      </ModalBody>
    </Modal>
  );
};

export default ModalSalesOpen;
