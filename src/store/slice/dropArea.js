import { createSlice } from "@reduxjs/toolkit";

export const dropAreaSlice = createSlice({
  name: "dropArea",
  initialState: {
    droppedItems: [], // для droppedItem
    droppedValues: [], // для droppedValue
    contents: [], // для content
    isDndActions: false,
  },
  reducers: {
    setDroppedItem: (state, action) => {
      state.droppedItems[action.payload.index] = action.payload.item;
    },
    setDroppedValue: (state, action) => {
      state.droppedValues[action.payload.index] = action.payload.value;
    },
    setContent: (state, action) => {
      state.contents[action.payload.index] = action.payload.content;
    },
    clearData: (state, action) => {
      const index = action.payload;
      state.droppedItems[index] = null;
      state.droppedValues[index] = null;
      state.contents[index] = null;
    },
    clearAllDropAreas: (state) => {
      state.droppedItems = [];
      state.droppedValues = [];
      state.contents = [];
    },
    setDndActions: (state, action) => {
      const isSet = action.payload;
      state.isDndActions = isSet;
    },
  },
});

// Экспорт созданных действий и редьюсера
export const {
  setDroppedItem,
  setDroppedValue,
  setContent,
  clearData,
  clearAllDropAreas,
  setDndActions,
} = dropAreaSlice.actions;

export default dropAreaSlice.reducer;
