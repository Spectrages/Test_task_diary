// ========================== store ===========================
import { RootState } from "../../store";

export const deedsSelector = (state: RootState) => state.deeds.deeds;

export const deedsErrorSelector = (state: RootState) =>
  state.deeds.errors.deeds;

export const deedsPendingSelector = (state: RootState) =>
  state.deeds.pending.deeds;

export const singleDeedSelector = (state: RootState) => state.deeds.singleDeed;

export const singleDeedErrorSelector = (state: RootState) =>
  state.deeds.errors.singleDeed;

export const singleDeedPendingSelector = (state: RootState) =>
  state.deeds.pending.singleDeed;
