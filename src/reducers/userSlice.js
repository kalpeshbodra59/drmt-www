import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedUser: null,
  modalOpen: false,
  userOptions: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setModalOpen: (state, action) => {
      state.modalOpen = action.payload;
    },
    setUserOptions: (state, action) => {
      state.userOptions = action.payload;
    },
    appendNewUserToUserOptions: (state, action) => {
      state.userOptions.push(action.payload);
    },
    resetUser: (state) => ({ ...initialState, userOptions: state.userOptions }),
  },
});

export const {
  setSelectedUser,
  setModalOpen,
  setUserOptions,
  appendNewUserToUserOptions,
  resetUser,
} = userSlice.actions;

export default userSlice.reducer;
