// ========================== api =============================
import { ISignInTemplate } from "@/types/sign-in/signIn.interface";
import $api from "../../../api/api";

// ========================== redux ===========================
import { createAsyncThunk } from "@reduxjs/toolkit";

// ========================== interfaces ======================

export const fetchSignIn = createAsyncThunk(
  "auth/fetchSignIn",
  async (data: ISignInTemplate, { rejectWithValue }) => {
    try {
      const response = await $api.post(`/auth/signIn`, data);
      return response.data.token;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message as string);
    }
  }
);
