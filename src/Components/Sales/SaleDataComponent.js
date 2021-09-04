/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Card, Button } from "reactstrap";
import { getSalesList } from "../../redux/ItemReducer";
import "../../styles/SaleComponent.css";
import ModalSalesOpen from "./modalSalesOpen";

const SaleDataComponent = () => {
  const dispatch = useDispatch();
  const ITEMPERPAGE = 2;
  const [modal, setModal] = useState(false);
  const [selectedSales, setSelectedSales] = useState(null);

  const SalesList = useSelector((state) => state.itemReducer.SalesList);
  const Update = useSelector((state) => state.itemReducer.retriggerUpdate);
  const [Paginate, setPaginate] = useState(0);

  useEffect(() => {
    dispatch(getSalesList());
  }, [Update]);

  const Total = (ProductList) => {
    let total = 0;
    ProductList.map((product) => (total += product.SellingPrice));
    return total;
  };

  const SalesDetails = (sales) => {
    setSelectedSales(sales);
    modal === false ? setModal(true) : setModal(false);
  };

  return (
    <div>
      <div className="pageNav">
        <Button
          className="prev"
          outline
          color="danger"
          onClick={() => {
            Paginate > 0 && setPaginate(Paginate - ITEMPERPAGE);
          }}
        >
          Previous
        </Button>
        <Button
          className="next"
          outline
          color="danger"
          onClick={() => {
            Paginate + ITEMPERPAGE < SalesList.length &&
              setPaginate(Paginate + ITEMPERPAGE);
          }}
        >
          Next
        </Button>
      </div>
      <Table className="salesTable">
        <thead>
          <tr>
            <th>SaleID</th>
            <th>Sales</th>
          </tr>
        </thead>
        {SalesList != null
          ? SalesList.slice(Paginate, Paginate + ITEMPERPAGE).map((sale) => (
              <Card
                className="salesCard"
                onClick={() => {
                  SalesDetails(sale);
                }}
              >
                <tr>
                  <div>{sale.SaleID}</div>
                  <div className="sales">
                    <div>
                      Date:
                      {new Date(sale.createdAt).toLocaleDateString()}
                    </div>
                    <div>
                      TotalSale:
                      {Total(sale.Sales)}
                    </div>
                    <div>
                      Time:
                      {new Date(sale.createdAt).toLocaleTimeString("en-US", {
                        timeZoneName: "short",
                      })}
                    </div>
                  </div>
                </tr>
              </Card>
            ))
          : null}
      </Table>
      <ModalSalesOpen
        modal={modal}
        setModal={setModal}
        selectedSales={selectedSales}
      />
    </div>
  );
};

export default SaleDataComponent;
