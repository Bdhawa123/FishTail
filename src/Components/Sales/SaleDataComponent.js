/* eslint-disable indent */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Card } from "reactstrap";
import { getSalesList } from "../../redux/ItemReducer";
import "../../styles/SaleComponent.css";

const SaleDataComponent = () => {
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
                <Card className="salesCard">
                  <tr>
                    <div>{sale.SaleID}</div>
                    <div className="sales">
                      <div>
                        Date: {new Date(sale.createdAt).toLocaleDateString()}
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
    </div>
  );
};

export default SaleDataComponent;
