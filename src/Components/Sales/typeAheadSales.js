/* eslint-disable no-else-return */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, DropdownItem } from "reactstrap";
import DropdownToggle from "reactstrap/lib/DropdownToggle";
import { getItems } from "../../redux/DataReducer";
import useEditInventory from "../../Forms/InventoryForm";

const INITIALSTATE = {
  inputText: "",
};
const TypeAheadSales = ({ title, listUpdate }) => {
  const [toggleDropdown, setToggle] = useState(true);
  const ref = useRef(null);

  const { handleChange, val } = useEditInventory(INITIALSTATE);
  const dispatch = useDispatch();
  const ItemList = useSelector((state) => state.dataReducer.items);
  const DropList = [];

  useEffect(() => {
    dispatch(getItems());

    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setToggle(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [val]);

  const populateDropdown = () => {
    Object.values(ItemList).map((item) =>
      item.map((element) => {
        DropList.push(element);
      })
    );
  };

  const TypeAheadvalues = () => {
    populateDropdown();
    const regex = new RegExp(`^${val.inputText}`);
    const suggestion = DropList.filter(
      (v) => regex.test(v.ProductID) || regex.test(v.ProductName)
    );
    /**
     * return the clicked Item to update
     */
    return val.inputText !== "" ? (
      <div ref={ref}>
        {toggleDropdown ? (
          <Dropdown isOpen={false} toggle={() => {}}>
            {suggestion.map((item) => (
              <DropdownItem
                onClick={() => {
                  listUpdate(item);
                }}
              >
                {item.ProductName}
              </DropdownItem>
            ))}
          </Dropdown>
        ) : null}
      </div>
    ) : null;
  };

  return (
    <div>
      <input
        type="text"
        placeholder={title}
        name="inputText"
        onChange={(event) => {
          handleChange(event);
          setToggle(true);
        }}
      />
      <TypeAheadvalues />
    </div>
  );
};
export default TypeAheadSales;
