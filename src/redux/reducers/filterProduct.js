import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: {
    items: [],
  },
  search: {
    items: [],
  },
};

export const filterPrdSlice = createSlice({
  name: "filterPrd",
  initialState,
  reducers: {
    updateCatFilterPrd: (state, action) => {
      state.category.items = action.payload;
    },
    updateSearchFilterPrd: (state, action) => {
      state.search.items = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCatFilterPrd, updateSearchFilterPrd } =
  filterPrdSlice.actions;

export default filterPrdSlice.reducer;
