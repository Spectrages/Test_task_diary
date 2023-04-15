// ============================ nest ====================================
import {
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";

// ========================== repositories ==============================
import { UsersRepository } from "./repos/users.repository";

// ========================== entities ==================================
import { UsersEntity } from "./entities/users.entity";
import { UserSessionDto } from "./dto's/user-session.dto";

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async getUserByTag(userTag: string): Promise<UsersEntity> {
    return await this.userRepository.getUserByTag(userTag);
  }

  async addToFriendList(
    currentUser: UserSessionDto,
    userTag: string
  ) {
    const newFriend = await this.userRepository.getUserByTag(userTag);
    if (!newFriend)
      throw new HttpException(
        "User not found!",
        HttpStatus.NOT_FOUND
      );
    currentUser.friends.push(newFriend._id);
    currentUser.updated = new Date().valueOf();
    return await this.userRepository.updateUser(currentUser);
  }
}
