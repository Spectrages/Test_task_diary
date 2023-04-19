// ========================== types ==========================
import { BaseState } from "../../../shared/base-state.interface";
import { UserDto } from "./user.dto";

export interface ProfileState extends BaseState {
  user: UserDto | null;
  pending: {
    user: boolean;
  };
  errors: {
    user: string | null;
  };
}
