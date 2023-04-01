import { configureStore } from "@reduxjs/toolkit";
import diamondSlice from "../reducers/diamondSlice";
import userSlice from "../reducers/userSlice";
import workerSlice from "../reducers/workerSlice";
import creditSlice from "../reducers/creditSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    diamond: diamondSlice,
    worker: workerSlice,
    credit: creditSlice,
  },
});
