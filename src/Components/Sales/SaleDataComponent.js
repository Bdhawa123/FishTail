/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Card } from "reactstrap";
import { getSalesList } from "../../redux/ItemReducer";
import "../../styles/SaleComponent.css";
import ModalSalesOpen from "./modalSalesOpen";

const SaleDataComponent = () => {
  const [modal, setModal] = useState(false);
  const [selectedSales, setSelectedSales] = useState(null);
  const dispatch = useDispatch();
  const SalesList = useSelector((state) => state.itemReducer.SalesList);
  const Update = useSelector((state) => state.itemReducer.retriggerUpdate);

  useEffect(() => {
    dispatch(getSalesList());
    console.log(SalesList);
  }, [Update]);

  const Total = (ProductList) => {
    let total = 0;
    ProductList.map((product) => {
      total += product.SellingPrice;
    });
    return total;
  };
  const SalesDetails = (sales) => {
    setSelectedSales(sales);
    modal === false ? setModal(true) : setModal(false);
  };

  return (
    <div>
      <Table className="salesTable">
        <thead>
          <tr>
            <th>SaleID</th>
            <th>Sales</th>
          </tr>
        </thead>
        {SalesList != null
          ? Object.values(SalesList).map((saleObj) =>
              saleObj.map((sale) => (
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
            )
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
