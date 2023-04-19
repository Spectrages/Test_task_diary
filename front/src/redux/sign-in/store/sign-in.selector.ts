// ========================== store ===========================
import { RootState } from "../../store";

export const signInSelector = (state: RootState) => state.signIn.token;

export const signInErrorSelector = (state: RootState) => state.signIn.errors;

export const signInPendingSelector = (state: RootState) => state.signIn.pending;
