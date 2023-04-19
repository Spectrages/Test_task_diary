// ========================== redux =============================
import { createSlice } from "@reduxjs/toolkit";
import { DeedsState } from "../types/deed-state.interface";

// ========================== actions ===========================
import {
  fetchDeleteUserDeed,
  fetchGetUserDeeds,
  fetchGetUserSingleDeed,
  fetchPostUserDeed,
  fetchPutUserDeed,
} from "./deeds.actions";

const initialState: DeedsState = {
  deeds: [],
  singleDeed: null,
  errors: {
    deeds: null,
    singleDeed: null,
  },
  pending: {
    deeds: false,
    singleDeed: false,
  },
};

const signInSlice = createSlice({
  name: "deeds",
  initialState: initialState,
  reducers: {
    clearErrors: (state) => {
      state.errors.deeds = null;
      state.errors.singleDeed = null;
    },
    clearSingleDeed: (state) => {
      state.singleDeed = null;
    },
  },
  extraReducers: (builder) => {
    //********************** GET ALL ************************/
    builder
      .addCase(fetchGetUserDeeds.pending, (state) => {
        state.pending.deeds = false;
      })
      .addCase(fetchGetUserDeeds.fulfilled, (state, action) => {
        state.pending.deeds = true;
        state.deeds = action.payload;
      })
      .addCase(
        fetchGetUserDeeds.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.deeds = false;
          state.deeds = [];
          state.errors.deeds = action.payload;
        }
      );

    //********************** GET ONE ************************/
    builder
      .addCase(fetchGetUserSingleDeed.pending, (state) => {
        state.pending.singleDeed = false;
      })
      .addCase(fetchGetUserSingleDeed.fulfilled, (state, action) => {
        state.pending.singleDeed = true;
        state.singleDeed = action.payload;
      })
      .addCase(
        fetchGetUserSingleDeed.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.singleDeed = false;
          state.singleDeed = null;
          state.errors.singleDeed = action.payload;
        }
      );

    //********************** CREATE SINGLE ************************/
    builder
      .addCase(fetchPostUserDeed.pending, (state) => {
        state.pending.singleDeed = false;
      })
      .addCase(fetchPostUserDeed.fulfilled, (state, action) => {
        state.pending.singleDeed = true;
        state.singleDeed = action.payload;
      })
      .addCase(
        fetchPostUserDeed.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.singleDeed = false;
          state.singleDeed = null;
          state.errors.singleDeed = action.payload;
        }
      );

    //********************** UPDATE SINGLE ************************/
    builder
      .addCase(fetchPutUserDeed.pending, (state) => {
        state.pending.singleDeed = false;
      })
      .addCase(fetchPutUserDeed.fulfilled, (state, action) => {
        state.pending.singleDeed = true;
        state.singleDeed = action.payload;
      })
      .addCase(
        fetchPutUserDeed.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.singleDeed = false;
          state.singleDeed = null;
          state.errors.singleDeed = action.payload;
        }
      );

    //********************** DELETE SINGLE ************************/
    builder
      .addCase(fetchDeleteUserDeed.pending, (state) => {
        state.pending.singleDeed = false;
      })
      .addCase(fetchDeleteUserDeed.fulfilled, (state, action) => {
        state.pending.singleDeed = true;
        state.singleDeed = action.payload;
      })
      .addCase(
        fetchDeleteUserDeed.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.singleDeed = false;
          state.singleDeed = null;
          state.errors.singleDeed = action.payload;
        }
      )

      .addDefaultCase(() => {});
  },
});
const { actions, reducer } = signInSlice;
export default reducer;
export const { clearErrors, clearSingleDeed } = signInSlice.actions;
export { fetchGetUserDeeds, fetchPostUserDeed };
