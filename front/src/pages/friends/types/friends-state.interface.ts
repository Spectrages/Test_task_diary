// ========================== types ==========================
import { UserSessionDto } from "@/shared/user-session.dto";
import { BaseState } from "../../../shared/base-state.interface";
import { ISingleDeed } from "@/pages/deeds/types/deed-single.interface";

export interface FriendsState extends BaseState {
  friends: UserSessionDto[] | [];
  singleFriend: UserSessionDto | null;
  friendDeeds: ISingleDeed[] | [];
  errors: {
    friends: string | null;
    singleFriend: string | null;
    friendDeeds: string | null;
  };
  pending: {
    friends: boolean;
    singleFriend: boolean;
    friendDeeds: boolean;
  };
}
