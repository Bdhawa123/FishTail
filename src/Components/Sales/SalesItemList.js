import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { addCount, decrease, deleteItem } from "../../redux/ItemReducer";
import "../../styles/salesItem.css";

const SalesItemList = ({ productList }) => {
  const dispatch = useDispatch();
  // const productList = useSelector((state) => state.itemReducer.ItemList);

  const [sum, setSum] = useState(0);

  useEffect(() => {
    let addedValue = 0;
    Object.values(productList).map((product) => {
      addedValue += product.count * product.SellingPrice;
    });
    setSum(addedValue);
  }, [productList]);

  return (
    <div className="SalesListItemCont">
      <Table className="tableSales">
        <tbody>
          {Object.values(productList).map((product) => (
            <tr key={product.ProductID}>
              <td>{product.ProductID}</td>
              <td>{product.ProductName}</td>
              <td>{product.SellingPrice}</td>
              <td>{product.ID}</td>

              <td>
                <AddIcon
                  onClick={() => {
                    dispatch(addCount({ id: product.ProductID }));
                  }}
                />
              </td>

              <td>{product.count}</td>

              <td>
                <RemoveIcon
                  onClick={() => {
                    dispatch(decrease({ id: product.ProductID }));
                  }}
                />
              </td>
              <td>{product.SellingPrice * product.count}</td>
              <td>
                <DeleteIcon
                  onClick={() => {
                    dispatch(deleteItem({ id: product.ProductID }));
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="sumContainer">
        <div className="left">SUM</div>
        <div className="right">{sum}</div>
      </div>
    </div>
  );
};
export default SalesItemList;
