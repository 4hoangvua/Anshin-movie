import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from "../Services/movieAPI";
import { notificationMove } from "../components/NotificationMove";
const inititalState = {
  tickets: [],
  selectedSeat: [],
  priceTicket: 0,
  chair: [],
};
export const getInfoTicket = createAsyncThunk(
  "ticket/getInfoTicket",
  async ({ id, setLoading }) => {
    setLoading(true);
    const data = await movieAPI.getInfoTicket(id);
    setLoading(false);
    return data;
  }
);
export const actionBooking = createAsyncThunk(
  "ticket/actionBooking",
  async ({ data, id, setLoading }, thunkAPI) => {
    const respone = await movieAPI.actionBooking(data);
    await thunkAPI.dispatch(getInfoTicket({ id, setLoading }));
    await thunkAPI.dispatch(resetChair());
    return respone;
  }
);
const ticketSlice = createSlice({
  name: "ticket",
  initialState: inititalState,
  reducers: {
    clickChair: (state, { payload }) => {
      const { selected, ...seatData } = payload;
      if (selected) {
        state.selectedSeat = [...state.selectedSeat, seatData];
        state.chair = [...state.chair, seatData.tenGhe];
      } else {
        state.selectedSeat = state.selectedSeat.filter(
          (item) => item.stt !== seatData.stt
        );
        state.chair = state.chair.filter((item) => item !== seatData.stt);
      }
      state.priceTicket = state.selectedSeat.reduce((total, seat) => {
        return total + seat.giaVe;
      }, 0);
    },
    resetChair: (state, { payload }) => {
      state.chair = [];
      state.selectedSeat = [];
      state.priceTicket = 0;
    },
  },
  extraReducers: {
    [getInfoTicket.fulfilled]: (state, { payload }) => {
      state.tickets = payload;
    },
    [actionBooking.rejected]: (state, { error }) => {
      notificationMove("error", error.message);
    },
  },
});
export const { clickChair, resetChair } = ticketSlice.actions;
export default ticketSlice.reducer;
