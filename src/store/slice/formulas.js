import { createSlice } from "@reduxjs/toolkit";

export const formulasSlice = createSlice({
  name: "formulas",
  initialState: {
    formula: {},
  },
  reducers: {
    initializeFromLocalStorage: (state) => {
      const savedFormulas = localStorage.getItem("formula");
      if (savedFormulas) {
        state.formula = JSON.parse(savedFormulas);
      }
    },
    addValue: (state, action) => {
      if (!state.formula[action.payload.key]) {
        state.formula[action.payload.key] = {};
        state.formula[action.payload.key].name = "name";
        state.formula[action.payload.key].value = ["", "", ""];
      }
      state.formula[action.payload.key].value[action.payload.index] =
        action.payload.value;
    },
    addEmpty: (state, action) => {
      if (!state.formula[action.payload.key]) {
        state.formula[action.payload.key] = {};
        state.formula[action.payload.key].name = "name";
        state.formula[action.payload.key].value = ["", "", ""];
      }
      state.formula[action.payload.key].value.push("");
    },
  },
});

// Action creators are generated for each case reducer function
export const { addValue, addEmpty, initializeFromLocalStorage } =
  formulasSlice.actions;

export default formulasSlice.reducer;
