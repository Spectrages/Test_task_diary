// ========================== redux =============================
import { createSlice } from "@reduxjs/toolkit";

// ========================== actions ===========================
import { FriendsState } from "../types/friends-state.interface";
import {
  fetchAllUsers,
  fetchFriendDeeds,
  fetchGetUserFriends,
  fetchRemoveUserFriend,
} from "./friends.actions";

const initialState: FriendsState = {
  users: [],
  friends: [],
  singleFriend: null,
  friendDeeds: [],
  errors: {
    users: null,
    friends: null,
    singleFriend: null,
    friendDeeds: null,
  },
  pending: {
    users: false,
    friends: false,
    singleFriend: false,
    friendDeeds: false,
  },
};

const friendsSlice = createSlice({
  name: "friends",
  initialState: initialState,
  reducers: {
    clearErrors: (state) => {
      state.errors.friends = null;
      state.errors.singleFriend = null;
    },
  },
  extraReducers: (builder) => {
    //********************** GET ALL ************************/
    builder
      .addCase(fetchGetUserFriends.pending, (state) => {
        state.pending.friends = false;
      })
      .addCase(fetchGetUserFriends.fulfilled, (state, action) => {
        state.pending.friends = true;
        state.friends = action.payload;
      })
      .addCase(
        fetchGetUserFriends.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.friends = false;
          state.friends = [];
          state.errors.friends = action.payload;
        }
      );

    //********************** GET CURRENT DEEDS ************************/
    builder
      .addCase(fetchFriendDeeds.pending, (state) => {
        state.pending.friendDeeds = false;
      })
      .addCase(fetchFriendDeeds.fulfilled, (state, action) => {
        state.pending.friendDeeds = true;
        state.friendDeeds = action.payload;
      })
      .addCase(
        fetchFriendDeeds.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.friendDeeds = false;
          state.friendDeeds = [];
          state.errors.friendDeeds = action.payload;
        }
      );

    //********************** REMOVE CURRENT ************************/
    builder
      .addCase(fetchRemoveUserFriend.pending, (state) => {
        state.pending.singleFriend = false;
      })
      .addCase(fetchRemoveUserFriend.fulfilled, (state, action) => {
        state.pending.singleFriend = true;
        state.singleFriend = action.payload;
      })
      .addCase(
        fetchRemoveUserFriend.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.singleFriend = false;
          state.singleFriend = null;
          state.errors.singleFriend = action.payload;
        }
      );

    //********************** GET ALL USERS ************************/
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.pending.users = false;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.pending.users = true;
        state.users = action.payload;
      })
      .addCase(
        fetchAllUsers.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.users = false;
          state.users = [];
          state.errors.users = action.payload;
        }
      )

      .addDefaultCase(() => {});
  },
});
const { actions, reducer } = friendsSlice;
export default reducer;
export const { clearErrors } = friendsSlice.actions;
export {
  fetchGetUserFriends,
  fetchRemoveUserFriend,
  fetchFriendDeeds,
  fetchAllUsers,
};
