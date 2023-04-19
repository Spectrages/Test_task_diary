// ========================== store ===========================
import { RootState } from "../../../redux/store";

export const friendsSelector = (state: RootState) => state.friends.friends;

export const friendsErrorSelector = (state: RootState) =>
  state.friends.errors.friends;

export const friendsPendingSelector = (state: RootState) =>
  state.friends.pending.friends;

export const singleFriendSelector = (state: RootState) =>
  state.friends.singleFriend;

export const singleFriendErrorSelector = (state: RootState) =>
  state.friends.errors.singleFriend;

export const singleFriendPendingSelector = (state: RootState) =>
  state.friends.pending.singleFriend;

export const friendDeedsSelector = (state: RootState) =>
  state.friends.friendDeeds;

export const friendDeedsErrorSelector = (state: RootState) =>
  state.friends.errors.friendDeeds;

export const friendDeedsPendingSelector = (state: RootState) =>
  state.friends.pending.friendDeeds;