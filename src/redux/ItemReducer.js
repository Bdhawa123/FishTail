import { createSlice, current } from "@reduxjs/toolkit";

export const ItemReducer = createSlice({
  name: "ItemList",
  initialState: {
    ItemList: [],
    changed: true,
  },
  reducers: {
    addItem: (state, action) => {
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
        searchItem.count += 1;
      }
    },

    decrease: (state, action) => {
      // eslint-disable-next-line no-confusing-arrow

      const searchItem = state.ItemList.find(
        (item) => item.ProductID === action.payload.id
      );
      if (searchItem) {
        searchItem.count -= 1;
      }
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
