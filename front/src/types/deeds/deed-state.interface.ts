// ========================== types ==========================
import { BaseState } from "../../shared/base-state.interface";
import { ISingleDeed } from "./deed-single.interface";

export interface DeedsState extends BaseState {
  deeds: ISingleDeed[];
  singleDeed: ISingleDeed | null;
  errors: {
    deeds: string | null;
    singleDeed: string | null;
  };
  pending: {
    deeds: boolean;
    singleDeed: boolean;
  };
}
