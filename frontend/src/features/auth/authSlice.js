import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  userLogin,
  logout,
  profile,
  updateProfile,
  passwordForgot,
  passwordUpdate,
  passwordReset,
} from "./authActions";

// const userInfo = localStorage.getItem("userInfo")
//   ? localStorage.getItem("userInfo")
//   : null;

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.userInfo.user = payload;
      // localStorage.setItem("userInfo", JSON.stringify(payload));
    },
    updateProfileReset: (state) => {
      state.loading = false;
      state.error = null;
      state.isUpdated = false;
    },
    clearmessage: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = false;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.isAuthenticated = true;
      localStorage.setItem("userInfo", JSON.stringify(payload));
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.isAuthenticated = false;
    },
    // register user
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.isAuthenticated = true;
      localStorage.setItem("userInfo", payload);
      // registration successful
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.isAuthenticated = false;
    },
    [logout.pending]: (state) => {
      state.loading = true;
      state.isAuthenticated = true;
      state.error = null;
    },
    [logout.fulfilled]: (state) => {
      localStorage.removeItem("userInfo"); // delete token from storage
      state.loading = false;
      state.isAuthenticated = false;
      state.userInfo = null;

      state.error = null;
    },
    [logout.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = payload;
    },
    [profile.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [profile.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.userInfo = payload;
    },
    [profile.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [updateProfile.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.isUpdated = false;
    },
    [updateProfile.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.error = null;
      state.isUpdated = payload.data.success;
    },
    [updateProfile.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.isUpdated = false;
    },
    [passwordUpdate.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.isUpdated = false;
    },
    [passwordUpdate.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.isUpdated = true;
    },
    [passwordUpdate.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.isUpdated = false;
    },
    [passwordReset.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = false;
    },
    [passwordReset.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.userInfo = payload;
      state.isAuthenticated = true;
    },
    [passwordReset.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.isAuthenticated = false;
    },
    [passwordForgot.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [passwordForgot.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.message = payload.message;
    },
    [passwordForgot.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { setCredentials, updateProfileReset, clearmessage } =
  authSlice.actions;

export default authSlice.reducer;
