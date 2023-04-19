// ========================== store ===========================
import { RootState } from "../../store";

export const signUpSelector = (state: RootState) => state.signUp.token;

export const signUpErrorSelector = (state: RootState) => state.signUp.errors;

export const signUpPendingSelector = (state: RootState) => state.signUp.pending;
