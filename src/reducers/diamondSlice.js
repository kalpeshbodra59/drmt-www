import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
  date: null,
  lotNo: null,
  selectedYear: null,
  selectedMonth: null,
  tableData: [],
};

export const diamondSlice = createSlice({
  name: "diamond",
  initialState,
  reducers: {
    setDiamondModalOpen: (state, action) => {
      const {
        modalOpen = false,
        date = "",
        lotNo = "",
        totalDiamond = "",
        totalDiamondWeight = "",
        workedDiamond = "",
        workedDiamondWeight = "",
        id = null,
      } = action.payload;
      state.modalOpen = modalOpen;
      state.date = date;
      state.lotNo = lotNo;
      state.totalDiamond = totalDiamond;
      state.totalDiamondWeight = totalDiamondWeight;
      state.workedDiamond = workedDiamond;
      state.workedDiamondWeight = workedDiamondWeight;
      state.id = id;
    },
    setDiamondTableYear: (state, action) => {
      state.selectedYear = action.payload;
    },
    setDiamondTableMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
    setDiamondTableData: (state, action) => {
      state.tableData = action.payload;
    },
    resetDiamond: () => initialState,
  },
});

export const {
  setDiamondModalOpen,
  setDiamondTableYear,
  setDiamondTableMonth,
  setDiamondTableData,
  resetDiamond,
} = diamondSlice.actions;

export default diamondSlice.reducer;
