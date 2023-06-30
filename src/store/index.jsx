import { configureStore } from "@reduxjs/toolkit";
import paginationSlice from "./pagination";
import favoriteBooksSlice from "./favoriteBooks";

const store = configureStore({
  reducer: {
    pagination: paginationSlice.reducer,
    favoriteBooks: favoriteBooksSlice.reducer,
  },
});

export default store;
