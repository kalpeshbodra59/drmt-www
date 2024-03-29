import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
  tableData: [],
};

export const creditSlice = createSlice({
  name: "credit",
  initialState,
  reducers: {
    setCreditModalOpen: (state, action) => {
      const {
        modalOpen = false,
      } = action.payload;
      state.modalOpen = modalOpen;
    },
    setCreditTableData: (state, action) => {
      state.tableData = action.payload || {};
    },
    resetCredit: () => initialState,
  },
});

export const {
  setCreditModalOpen,
  setCreditTableData,
  resetCredit,
} = creditSlice.actions;

export default creditSlice.reducer;
