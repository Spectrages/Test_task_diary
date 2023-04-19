// ========================== redux ==========================
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

// ========================== store ==========================
import $api from "../../../api/api";
import { IUserFormInput } from "../types/user-session.interface";

// ============ GET USER INFO ============ //
export const fetchGetUserInfo = createAsyncThunk(
  "users/getUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await $api.get(`/users`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message as string);
    }
  }
);

//============ UPDATE USER INFO ============
export const fetchUpdateUserInfo = createAsyncThunk(
  "users/updateUserInfo",
  async (userData: IUserFormInput, { rejectWithValue }) => {
    try {
      const response = await $api.put(`/users`, userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message as string);
    }
  }
);

//============ DELETE USER ACCOUNT ============
export const fetchDeleteUserAccount = createAsyncThunk(
  "users/deleteUserAccount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await $api.delete(`/users`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message as string);
    }
  }
);
