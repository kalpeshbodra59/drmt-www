import { configureStore } from "@reduxjs/toolkit";
import diamondSlice from "../reducers/diamondSlice";
import userSlice from "../reducers/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    diamond: diamondSlice,
  },
});
