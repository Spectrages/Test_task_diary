// ========================== store ==========================
import { RootState } from "../../../redux/store";

export const profileInfoSelector = (state: RootState) => state.profile.user;
export const profileLoadingSelector = (state: RootState) =>
  state.profile.pending;
export const profileErrorsSelector = (state: RootState) => state.profile.errors;
