import $api from "@/api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGetUserFriends = createAsyncThunk(
  "friends/getAllFriends",
  async (_, { rejectWithValue }) => {
    try {
      const response = await $api.get(`/users/friends`);
      console.log(response.data)
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message as string);
    }
  }
);

export const fetchAddUserFriend = createAsyncThunk(
  "friends/addUserInFriendList",
  async (userTag: string, { rejectWithValue }) => {
    try {
      const response = await $api.put(`/users/friends`, userTag);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message as string);
    }
  }
);

export const fetchRemoveUserFriend = createAsyncThunk(
  "friends/removeUserFromFriendList",
  async (userTag: string, { rejectWithValue }) => {
    try {
      const response = await $api.put(`/users/friends/remove/${userTag}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message as string);
    }
  }
);

export const fetchFriendDeeds = createAsyncThunk(
  "friends/getFriendDeeds",
  async (userTag: string, { rejectWithValue }) => {
    try {
      const response = await $api.get(`/users/friends/deeds/${userTag}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message as string);
    }
  }
);
