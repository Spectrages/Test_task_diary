// =========================== redux ===========================
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

// =========================== slices ===========================
import signUp from "./sign-up/store/sign-up.slice";
import signIn from "./sign-in/store/sign-in.slice";
import profile from "./profile/store/profile.slice";
import deeds from "./deeds/store/deeds.slice";
import friends from "./friends/store/friends.slice";

const store = configureStore({
  reducer: {
    signUp,
    signIn,
    profile,
    deeds,
    friends,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
