import { configureStore } from "@reduxjs/toolkit";
import DReducer from "./DataReducer";
import ItemReducer from "./ItemReducer";
import SReducer from "./styleReducer";

export default configureStore({
  reducer: {
    styleReducer: SReducer,
    dataReducer: DReducer,
    itemReducer: ItemReducer,
  },
});
