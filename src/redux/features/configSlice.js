import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  llm: "Gpt-4",
  apiKey: "",
  // prompt1: "",
  // prompt2: "",
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    addConfig(state, action) {
      state.llm = action.payload.llm ?? state.llm;
      state.apiKey = action.payload.apiKey ?? state.apiKey;
      // state.prompt1 = action.payload.prompt ?? state.prompt1;
      // state.prompt2 = action.payload.prompt ?? state.prompt2;
    },
    removeConfig(state, action) {
      state.llm = "Gpt-4";
      state.apiKey = "";
      // state.prompt1 = "";
      // state.prompt2 = "";
    },

    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          llm: action.payload.llm ?? state.llm,
          apiKey: action.payload.apiKey ?? state.apiKey,
          // prompt1: action.payload.prompt ?? state.prompt1,
          // prompt2: action.payload.prompt ?? state.prompt2,
        };
      },
    },
  },
});

export const { addConfig, removeConfig } = configSlice.actions;

export const selectConfig = (state) => state?.config;

export default configSlice.reducer;
