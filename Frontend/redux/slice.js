import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./AdminSclice";

export const store = configureStore({
  reducer: {
    admin: adminSlice,
  },
});

export default store;