// ========================== redux =============================
import { createSlice } from "@reduxjs/toolkit";

// ========================== actions ===========================
import { fetchSignIn } from "./sign-in.actions";

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

const signInSlice = createSlice({
  name: "signIn",
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
      .addCase(fetchSignIn.pending, (state) => {
        state.pending.token = false;
      })
      .addCase(fetchSignIn.fulfilled, (state, action) => {
        state.pending.token = true;
        state.token = action.payload;
      })
      .addCase(
        fetchSignIn.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.token = false;
          state.token = "";
          state.errors.token = action.payload;
        }
      )
      .addDefaultCase(() => {});
  },
});
const { actions, reducer } = signInSlice;
export default reducer;
export const { logout, clearErrors } = signInSlice.actions;
export { fetchSignIn };
