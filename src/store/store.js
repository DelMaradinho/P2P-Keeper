import { configureStore } from "@reduxjs/toolkit";
import formulasReducer from "./slice/formulas";
import dropAreaReducer from "./slice/dropArea";

export default configureStore({
  reducer: {
    formulas: formulasReducer,
    drop: dropAreaReducer,
  },
});
