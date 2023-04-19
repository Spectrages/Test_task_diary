import $api from "@/api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IDeedDto } from "../types/deed-create.interface";
import { IDeedUpdateDto } from "../types/deed-update.interface";

export const fetchGetUserDeeds = createAsyncThunk(
  "deeds/getUserDeeds",
  async (_, { rejectWithValue }) => {
    try {
      const response = await $api.get(`/users/deeds`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message as string);
    }
  }
);

export const fetchGetUserSingleDeed = createAsyncThunk(
  "deeds/getUserSingleDeeds",
  async (deedId: string, { rejectWithValue }) => {
    try {
      const response = await $api.get(`/users/deeds/${deedId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message as string);
    }
  }
);

export const fetchPostUserDeed = createAsyncThunk(
  "deeds/postUserDeed",
  async (data: IDeedDto, { rejectWithValue }) => {
    try {
      const response = await $api.post(`/users/deeds`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message as string);
    }
  }
);

export const fetchPutUserDeed = createAsyncThunk(
  "deeds/putUserDeed",
  async (data: IDeedUpdateDto, { rejectWithValue }) => {
    try {
      console.log(data);
      const response = await $api.put(`/users/deeds/${data._id}`, {
        name: data.name,
        description: data.description,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message as string);
    }
  }
);

export const fetchDeleteUserDeed = createAsyncThunk(
  "deeds/deleteUserDeed",
  async (deedId: string, { rejectWithValue }) => {
    try {
      const response = await $api.delete(`/users/deeds/${deedId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message as string);
    }
  }
);
