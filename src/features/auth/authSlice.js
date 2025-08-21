import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  isLoggedIn: !!storedToken,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.message = action.payload.message;
    },
    loginFail(state, action) {
      state.message = action.payload;
      state.isLoggedIn = false;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.message = "";
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    // EditProfile actions
    fetchProfileStart(state) {
      state.loading = true;
    },
    fetchProfileSuccess(state, action) {
      state.loading = false;
      state.profile = action.payload; // store fetched profile
    },
    fetchProfileFail(state, action) {
      state.loading = false;
      state.message = action.payload;
    },

    updateProfileStart(state) {
      state.loading = true;
    },
    updateProfileSuccess(state, action) {
      state.loading = false;
      state.profile = { ...state.profile, ...action.payload }; // update profile state
      state.user = { ...state.user, ...action.payload }; // update user info (name, email, mobile)
      localStorage.setItem("user", JSON.stringify(state.user));
      state.message = "Profile updated successfully";
    },
    updateProfileFail(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
  },
});

export const {
  loginSuccess,
  loginFail,
  logout,
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFail,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFail,
} = authSlice.actions;
export default authSlice.reducer;
