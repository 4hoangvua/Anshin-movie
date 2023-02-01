import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from "../Services/movieAPI";
import { token } from "../Services/token";
import { notificationMove } from "../components/NotificationMove";
let user = null;
if (localStorage.getItem("user")) {
  user = JSON.parse(localStorage.getItem("user"));
}
const inititalState = {
  userLogin: user,
  infoUser: {},
};

export const userLoginActive = createAsyncThunk(
  "userLogin/userLoginActive",
  async (info) => {
    const data = await movieAPI.accountUser(info);
    return data;
  }
);
export const userRegister = createAsyncThunk(
  "userLogin/userRegister",
  async (info) => {
    await movieAPI.userRegister(info);
  }
);
export const getInfoUser = createAsyncThunk(
  "userLogin/getInfoUser",
  async () => {
    const data = await movieAPI.getInfoUser();
    return data;
  }
);
export const updateInfoUser = createAsyncThunk(
  "userLogin/updateInfoUser",
  async (data) => {
    data.setLoading(true);
    const respone = await movieAPI.updateInfoUser(data.values);
    data.setLoading(false);
    return respone;
  }
);
const userSlice = createSlice({
  name: "userLogin",
  initialState: inititalState,
  reducers: {
    deleteUserLoginAdmin: (state) => {
      state.userLogin = null;
      localStorage.removeItem("user");
    },
    resetToken: (state) => {
      if (state.userLogin) {
        const { accessToken } = JSON.parse(localStorage.getItem("user"));
        state.userLogin = { ...state.userLogin, accessToken: accessToken };
      }
    },
  },
  extraReducers: {
    [userLoginActive.fulfilled]: (state, { payload }) => {
      state.userLogin = payload;
      localStorage.setItem("user", JSON.stringify(payload));
      notificationMove("success", "Đăng nhập thành công");
    },
    [userLoginActive.rejected]: (state, { error }) => {
      notificationMove("error", error.message);
    },
    [userRegister.fulfilled]: () => {
      notificationMove("success", "Đăng ký thành công");
    },
    [userRegister.rejected]: (state, { error }) => {
      notificationMove("error", error.message);
    },
    [getInfoUser.fulfilled]: (state, { payload }) => {
      state.infoUser = payload;
    },
    [getInfoUser.rejected]: (state, { error }) => {
      notificationMove("error", error.message);
    },
    [updateInfoUser.fulfilled]: (state, { payload }) => {
      const data = [...state.infoUser.thongTinDatVe];
      state.infoUser = { ...payload, thongTinDatVe: [...data] };
      state.userLogin = {
        ...state.userLogin,
        email: payload.email,
        hoTen: payload.hoTen,
        soDT: payload.soDT,
      };
      localStorage.setItem("user", JSON.stringify(state.userLogin));
      notificationMove("success", "Cập nhật thành công");
    },
    [updateInfoUser.rejected]: (state, { error }) => {
      notificationMove("error", error.message);
    },
  },
});
export const { deleteUserLoginAdmin } = userSlice.actions;
export default userSlice.reducer;
