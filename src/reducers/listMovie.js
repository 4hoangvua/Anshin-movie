import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from "../Services/movieAPI";
import { notificationMove } from "../components/NotificationMove";
const initialState = {
  listMovie: [],
  totalPages: [],
};

export const getListMovie = createAsyncThunk(
  "movie/getListMovie",
  async (page) => {
    try {
      const data = await movieAPI.getMovieShowing(page);
      return data;
    } catch (error) {
      throw error.data;
    }
  }
);
const listMovie = createSlice({
  name: "movie",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getListMovie.fulfilled]: (state, { payload }) => {
      state.listMovie = payload.items;
      let newArray = [];
      for (let index = 1; index <= payload.totalPages; index++) {
        newArray.push(index);
      }
      state.totalPages = newArray;
    },
    [getListMovie.rejected]: (state, { error }) => {
      notificationMove("error", error.message);
    },
  },
});
export default listMovie.reducer;
