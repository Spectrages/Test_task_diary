// ========================== store ===========================
import { RootState } from "../../store";

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

export const usersSelector = (state: RootState) => state.friends.users;

export const usersErrorSelector = (state: RootState) =>
  state.friends.errors.users;

export const usersPendingSelector = (state: RootState) =>
  state.friends.pending.users;

export const singleUserSelector = (state: RootState) =>
  state.friends.singleUser;

export const singleUserErrorSelector = (state: RootState) =>
  state.friends.errors.singleUser;

export const singleUserPendingSelector = (state: RootState) =>
  state.friends.pending.singleUser;
