// ========================== redux =============================
import { createSlice } from "@reduxjs/toolkit";

// ========================== actions ===========================
import { fetchSignUp } from "./sign-up.actions";

type IInitialState = {
  token: string;
  errors: {
    token: string | null;
  };
  pending: {
    token: boolean;
  };
};

const initialState = {
  token: "",
  errors: {
    token: null,
  },
  pending: {
    token: false,
  },
} as IInitialState;

const signUpSlice = createSlice({
  name: "signUp",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.token = "";
    },
    clearErrors: (state) => {
      state.errors.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignUp.pending, (state) => {
        state.pending.token = false;
      })
      .addCase(fetchSignUp.fulfilled, (state, action) => {
        state.pending.token = true;
        state.token = action.payload;
      })
      .addCase(
        fetchSignUp.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.token = false;
          state.token = "";
          state.errors.token = action.payload;
        }
      )
      .addDefaultCase(() => {});
  },
});
const { actions, reducer } = signUpSlice;
export default reducer;
export const { logout, clearErrors } = signUpSlice.actions;
export { fetchSignUp };
