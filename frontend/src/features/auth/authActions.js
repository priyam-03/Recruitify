import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/api/v1/login`,
        { email, password },
        { withCredentials: true },
        config
      );

      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ name, email, password, file }, { rejectWithValue }) => {
    console.log(file);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/v1/register`,
        { name, email, password, file },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
        { withCredentials: true },
        config
      );

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const logout = createAsyncThunk("user/logout", async (thunkAPI) => {
  try {
    await axios.get(`/api/v1/logout`);
  } catch (error) {
    thunkAPI.dispatch({ payload: error.message });
  }
});

export const profile = createAsyncThunk(
  "user/profile",
  async (rejectWithValue) => {
    try {
      const { data } = await axios.get(`/api/v1/me`, { withCredentials: true });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const updateProfile = createAsyncThunk(
  "user/updateprofile",
  async ({ name, email, password, file }, { rejectWithValue }) => {
    try {
      const success = await axios.put(
        `/api/v1/me/update`,
        { name, email, password, file },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
        { withCredentials: true }
      );
      console.log(success);
      return success;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const passwordUpdate = createAsyncThunk(
  "user/passwordupdate",
  async (
    { oldPassword, confirmPassword, newPassword },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/v1/password/update`,
        { oldPassword, confirmPassword, newPassword },
        { withCredentials: true },
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const passwordForgot = createAsyncThunk(
  "user/passwordforgot",
  async ({ email }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/v1/password/forgot`,
        { email },

        { withCredentials: true },
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const passwordReset = createAsyncThunk(
  "user/passwordreset",
  async ({ newPassword, confirmPassword, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/v1/password/reset/${token}`,
        { newPassword, confirmPassword, token },
        { withCredentials: true },
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
