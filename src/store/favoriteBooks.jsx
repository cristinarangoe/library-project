import { createSlice } from "@reduxjs/toolkit";

const initialFavoriteBooksState = {
  favoriteBooks: [],
  isFavorite: false,
};

const favoriteBooksSlice = createSlice({
  name: "favoriteBooks",
  initialState: initialFavoriteBooksState,
  reducers: {
    setFavoriteBooks(state, action) {
      state.favoriteBooks = action.payload;
    },
    saveFavoriteBooks(state, action) {
      const book = state.favoriteBooks.find((book) => book === action.payload);
      if (book) {
        state.favoriteBooks = state.favoriteBooks.filter(
          (book) => book != action.payload
        );
      } else {
        state.favoriteBooks.push(action.payload);
      }
      localStorage.setItem(
        "favoriteBooks",
        JSON.stringify(state.favoriteBooks)
      );
    },
  },
});

export default favoriteBooksSlice;

export const favoriteBooksActions = favoriteBooksSlice.actions;
