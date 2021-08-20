import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import uuid from "uuid";

export const createSales = createAsyncThunk(
  "ItemList/create",
  async (ProductList) => {
    const SalesItem = {
      SaleID: uuid.v4(),
      Sales: ProductList,
    };
    console.log(SalesItem);
    fetch("http://localhost:3030/api/Sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(SalesItem),
    })
      .then((res) => res.json())
      .then((result) => result.data)
      .then((error) => {
        console.log(error);
      });
  }
);

export const ItemReducer = createSlice({
  name: "ItemList",
  initialState: {
    ItemList: [],
    changed: true,
    SalesList: [],
  },
  reducers: {
    addItem: (state, action) => {
      console.log(action.payload);
      if (
        state.ItemList.every(
          (item) => item.ProductID !== action.payload.ProductID
        )
      ) {
        state.ItemList = [...state.ItemList, { ...action.payload, count: 1 }];
      }
    },

    changeBool: (state) => {
      state.changed = true;
    },
    deleteItem: (state, action) => {
      console.log(action);
      state.ItemList = state.ItemList.filter(
        (item) => item.ProductID !== action.payload.id
      );
    },

    addCount: (state, action) => {
      // eslint-disable-next-line no-confusing-arrow

      const searchItem = state.ItemList.find(
        (item) => item.ProductID === action.payload.id
      );
      if (searchItem) {
        if (searchItem.count !== searchItem.Quantity) {
          searchItem.count += 1;
        }
      }
    },

    decrease: (state, action) => {
      // eslint-disable-next-line no-confusing-arrow

      const searchItem = state.ItemList.find(
        (item) => item.ProductID === action.payload.id
      );
      if (searchItem) {
        if (searchItem.count !== 0) {
          searchItem.count -= 1;
        }
      }
    },
  },
  extraReducers: {
    [createSales.fulfilled]: (state, action) => {
      state.SalesList = action.payload;
      state.ItemList = [];
    },
  },
});

export const {
  addItem,
  changeBool,
  deleteItem,
  addCount,
  decrease,
} = ItemReducer.actions;

export default ItemReducer.reducer;
