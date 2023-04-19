// ========================== react ==========================
import { decodeToken } from "react-jwt";

// ========================== redux ==========================
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ========================== types ==========================
import { ProfileState } from "@/types/profile/profile-state.interface";
import { UserFromTokenDto } from "@/types/profile/user-from-token.dto";
import { UserUpdateDto } from "@/types/profile/user-update.dto";
import { UserDto } from "@/types/profile/user.dto";

// ========================== store ==========================
import {
  fetchDeleteUserAccount,
  fetchGetUserInfo,
  fetchUpdateUserInfo,
} from "./profile.actions";

const initialState: ProfileState = {
  user: null,
  pending: {
    user: false,
  },
  errors: {
    user: null,
  },
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // ============ GET USER ============ //
    getUser: (state) => {
      const token = window.localStorage.getItem("token");
      if (token) {
        const userFromToken: UserFromTokenDto | null = decodeToken(token);
        const user = {
          _id: userFromToken?._id,
          email: userFromToken?.email,
          firstname: userFromToken?.firstname,
          middlename: userFromToken?.middlename,
          lastname: userFromToken?.lastname,
          tag: userFromToken?.tag,
          friends: userFromToken?.friends,
          deeds: userFromToken?.deeds,
          rating: userFromToken?.rating,
          created: userFromToken?.created,
          updated: userFromToken?.updated,
        };
        if (user !== null) {
          state.user = user as UserDto;
        }
      }
    },
    clearErrors: (state) => {
      state.errors.user = null;
    },
  },
  extraReducers: (builder) => {
    // ============ GET USER INFO ============ //
    builder
      .addCase(fetchGetUserInfo.pending, (state) => {
        state.pending.user = true;
        state.errors.user = null;
      })
      .addCase(fetchGetUserInfo.fulfilled, (state, action) => {
        state.pending.user = false;
        state.user = action.payload;
      })
      .addCase(
        fetchGetUserInfo.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.user = false;
          state.errors.user = action.payload;
        }
      );

    //============ UPDATE USER INFO ============
    builder
      .addCase(fetchUpdateUserInfo.pending, (state) => {
        state.pending.user = true;
        state.errors.user = null;
      })
      .addCase(
        fetchUpdateUserInfo.fulfilled,
        (state, action: PayloadAction<UserUpdateDto>) => {
          state.pending.user = false;
          state.user = action.payload;
        }
      )
      .addCase(
        fetchUpdateUserInfo.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.user = false;
          state.errors.user = action.payload;
        }
      );
    //============ DELETE USER ACCOUNT ============
    builder
      .addCase(fetchDeleteUserAccount.pending, (state) => {
        state.pending.user = true;
        state.errors.user = null;
      })
      .addCase(
        fetchDeleteUserAccount.fulfilled,
        (state, action: PayloadAction<UserUpdateDto>) => {
          state.pending.user = false;
          state.user = action.payload;
        }
      )
      .addCase(
        fetchDeleteUserAccount.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.user = false;
          state.errors.user = action.payload;
        }
      )
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = profileSlice;
export default reducer;
export const { clearErrors } = profileSlice.actions;
export { fetchGetUserInfo, fetchUpdateUserInfo, fetchDeleteUserAccount };
