import { configureStore } from "@reduxjs/toolkit";
import formulasReducer from "./slice/formulas";

export default configureStore({
  reducer: {
    formulas: formulasReducer,
  },
});
