import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedWorker: null,
  modalOpen: false,
  workerOptions: [],
};

export const workerSlice = createSlice({
  name: "worker",
  initialState,
  reducers: {
    setSelectedWorker: (state, action) => {
      state.selectedWorker = action.payload;
    },
    setModalOpen: (state, action) => {
      state.modalOpen = action.payload;
    },
    setWorkerOptions: (state, action) => {
      state.workerOptions = action.payload;
    },
    appendNewWorkerToWorkerOptions: (state, action) => {
      state.workerOptions.push(action.payload);
    },
  },
});

export const {
  setSelectedWorker,
  setModalOpen,
  setWorkerOptions,
  appendNewWorkerToWorkerOptions,
} = workerSlice.actions;

export default workerSlice.reducer;
