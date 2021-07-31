import { configureStore } from "@reduxjs/toolkit";
import DReducer from "./DataReducer";
import SReducer from "./styleReducer";

export default configureStore({
  reducer: {
    styleReducer: SReducer,
    dataReducer: DReducer,
  },
});
