import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getItems = createAsyncThunk("Data/getData", async () => {
  const response = await fetch("http://localhost:3030/api/Inventory", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => result.data)
    .catch((error) => {
      console.log(error);
    });

  return response;
});

export const editItems = createAsyncThunk("Data/editData", async (value) => {
  fetch(`http://localhost:3030/api/Inventory/${value.ProductID}`, {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  })
    .then((res) => {
      console.log(res);
      if (res.ok) {
        alert("Update Successful");
      } else {
        alert("Update unsuccessful");
      }
    })
    .catch((error) => {
      alert("Unsuccesful");
      console.log(error);
    });
});

export const addItems = createAsyncThunk("Data/addItems", async (value) => {
  fetch("http://localhost:3030/api/Inventory", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  })
    .then((res) => {
      console.log(res);
      if (res.ok) {
        alert("Create Successful");
      } else {
        alert("Create unsuccessful");
      }
    })
    .catch((error) => {
      alert("Unsuccesful");
    });
});

export const deleteItem = createAsyncThunk("Data/deleteItems", async (ID) => {
  fetch(`http://localhost:3030/api/Inventory/${ID}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log(res);
      if (res.ok) {
        alert("Delete Successful");
      } else {
        alert("Delete unsuccessful");
      }
    })
    .catch((error) => {
      alert("Unsuccesful");
    });
  // setConfirmValue("");
});

export const DataReducer = createSlice({
  name: "Data",
  initialState: {
    items: [],
    errors: [],
    retriggerUpdate: false,
  },
  reducers: {},
  extraReducers: {
    [getItems.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.retriggerUpdate = false;
    },
    [getItems.rejected]: (state, action) => {
      console.log(action.payload);
      state.errors = action.payload;
    },
    [editItems.fulfilled]: (state, action) => {
      console.log(state.items);
      state.retriggerUpdate = true;
    },
    [addItems.fulfilled]: (state, action) => {
      console.log("Item added");
      state.retriggerUpdate = true;
    },
    [deleteItem.fulfilled]: (state, action) => {
      console.log("Item deleted");
      state.retriggerUpdate = true;
    },
  },
});

// export const { getItems } = DataReducer.actions;

export default DataReducer.reducer;
