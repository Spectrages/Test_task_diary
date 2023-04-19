import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

// =========================== Slices ===========================
import signUp from "../pages/sign-up/store/sign-up.slice";
import signIn from "../pages/sign-in/store/sign-in.slice";
import profile from "../pages/profile/store/profile.slice";
import deeds from "../pages/deeds/store/deeds.slice";

const store = configureStore({
  reducer: {
    signUp,
    signIn,
    profile,
    deeds,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
