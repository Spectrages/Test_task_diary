// ========================== store ===========================
import { RootState } from "../../../redux/store";

export const signUpSelector = (state: RootState) => state.signUp.token;

export const signUpErrorSelector = (state: RootState) => state.signUp.errors;

export const signUpPendingSelector = (state: RootState) => state.signUp.pending;
