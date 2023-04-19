// ========================== types ==========================
import { UserSessionDto } from "@/shared/user-session.dto";
import { BaseState } from "../../shared/base-state.interface";
import { ISingleDeed } from "@/types/deeds/deed-single.interface";

export interface FriendsState extends BaseState {
  users: UserSessionDto[] | [];
  friends: UserSessionDto[] | [];
  singleFriend: UserSessionDto | null;
  friendDeeds: ISingleDeed[] | [];
  errors: {
    users: string | null;
    friends: string | null;
    singleFriend: string | null;
    friendDeeds: string | null;
  };
  pending: {
    users: boolean;
    friends: boolean;
    singleFriend: boolean;
    friendDeeds: boolean;
  };
}
