import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  isAuth: false,
  email: "",
  name: "",
  userId: "",
  given_name: "",
  roles: [],
  gender: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAuth(state, action) {
      state.isAuth = true;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.userId = action.payload?.userId
        ? action.payload.userId
        : state.userId;
      state.given_name = action.payload.given_name;
      state.roles = action.payload.roles;
      state.gender = action.payload.gender;
    },
    addEmail(state, action) {
      return {
        ...state,
        email: action.payload.email,
        name: action.payload.username,
        userId: action.payload.userId,
      };
    },
    logOut(state, action) {
      state.isAuth = false;
      state.email = "";
      state.name = "";
      state.userId = "";
      state.given_name = "";
      state.roles = [];
      state.gender = null;
    },

    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.isAuth,
          ...action.payload.email,
          ...action.payload.name,
          ...action.payload.userId,
          ...action.payload.given_name,
          ...action.payload.roles,
          ...action.payload.gender,
        };
      },
    },
  },
});

export const { addAuth, logOut, addEmail } = authSlice.actions;

export const selectAuth = (state) => state?.auth;

export default authSlice.reducer;
