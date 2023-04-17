// ========================== api =============================
import $api from "../../../api/api";

// ========================== redux ===========================
import { createAsyncThunk } from "@reduxjs/toolkit";

// ========================== interfaces ======================
import { ISignUpTemplate } from "../interfaces/signUp.interface";

export const fetchSignUp = createAsyncThunk(
  "auth/fetchSignUp",
  async (data: ISignUpTemplate, { rejectWithValue }) => {
    try {
      const response = await $api.post(`/auth/signUp`, data);
      return response.data.token;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message as string);
    }
  }
);
