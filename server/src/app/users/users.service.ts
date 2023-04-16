// ============================ nest ====================================
import {
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";

// ========================== i18n ======================================
import { I18nContext } from "nestjs-i18n";

// ========================== repositories ==============================
import { UsersRepository } from "./repos/users.repository";
import { SingleDeedRepository } from "./repos/deed.repository";

// ========================== entities & dto's ==================================
import { UsersEntity } from "./entities/users.entity";
import { UserSessionDto } from "./dto's/user-session.dto";
import { CreateSingleDeedDto } from "./dto's/deed-create.dto";
import { SingleDeedDto } from "./dto's/deed.dto";
import { ObjectID } from "typeorm";
import { SingleDeedEntity } from "./entities/single-deed.entity";

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly deedRepository: SingleDeedRepository
  ) {}

  async getUserByTag(userTag: string): Promise<UsersEntity> {
    return await this.userRepository.getUserByTag(userTag);
  }

  async addToFriendList(
    currentUser: UserSessionDto,
    userTag: string
  ): Promise<UsersEntity> {
    const user = await this.userRepository.getUserById(
      currentUser._id
    );

    const newFriend = await this.userRepository.getUserByTag(userTag);

    if (!newFriend)
      throw new HttpException(
        `${I18nContext.current().t("errors.user.userDoesNotExist")}`,
        HttpStatus.NOT_FOUND
      );

    user.friends.push(newFriend._id);
    user.updated = new Date();
    return await this.userRepository.updateUser(user);
  }

  async createDeed(
    currentUser: UserSessionDto,
    deed: CreateSingleDeedDto
  ): Promise<UsersEntity> {
    const user = await this.userRepository.getUserById(
      currentUser._id
    );
    const newDeed = await this.deedRepository.createDeed(deed);
    user.deeds.push(newDeed._id);
    user.updated = new Date();
    return await this.userRepository.updateUser(user);
  }

  async getDeedsByTag(
    userTag: string,
    currentUser: UserSessionDto
  ): Promise<ObjectID[]> {
    const user = await this.userRepository.getUserByTag(userTag);

    const current = await this.userRepository.getUserById(
      currentUser._id
    );
    const friendList = current.friends;

    if (friendList.length < 1)
      throw new HttpException(
        "The user is not your friend!",
        HttpStatus.BAD_REQUEST
      );

    const res = friendList.map(
      (item) => item.toString() === user._id.toString()
    );

    if (res.includes(false))
      throw new HttpException(
        "The user is not your friend!",
        HttpStatus.BAD_REQUEST
      );
      console.log(user.deeds)
    return user.deeds;
  }

  async removeFromFriendList(userTag: string, user: UserSessionDto) {
    const friend = await this.userRepository.getUserByTag(userTag);
    if (!friend)
      throw new HttpException(
        `${I18nContext.current().t("errors.user.userDoesNotExist")}`,
        HttpStatus.NOT_FOUND
      );

    let currentUser = await this.getUserByTag(user.tag);
    const newFriends = currentUser.friends.filter(
      (item) => item === friend._id
    );
    currentUser.friends = newFriends;
    return await this.userRepository.updateUser(currentUser);
  }

  async deleteUser(user: UserSessionDto): Promise<HttpStatus> {
    return await this.userRepository.deleteUser(user);
  }

  async deleteDeedById(
    deedId: ObjectID,
    user: UserSessionDto
  ): Promise<UsersEntity> {
    const result = await this.deedRepository.deleteById(deedId);
    if (result !== 200)
      throw new HttpException(
        `${I18nContext.current().t("errors.user.userDoesNotExist")}`,
        HttpStatus.NOT_FOUND
      );
    const newUser = await this.userRepository.getUserById(user._id);
    const newDeeds = newUser.deeds.filter(
      (item) => item.toString() !== deedId.toString()
    );
    newUser.deeds = newDeeds;
    return await this.userRepository.updateUser(newUser);
  }

  async updateDeedById(
    deedId: ObjectID,
    user: UserSessionDto,
    info: SingleDeedDto
  ): Promise<SingleDeedEntity> {
    const currentDeed = await this.deedRepository.getDeedById(deedId);
    // if (!currentDeed)
    //   throw new HttpException(
    //     `${I18nContext.current().t("errors.deed.deedDoesNotExist")}`,
    //     HttpStatus.NOT_FOUND
    //   );
    Object.assign(currentDeed, info);
    return await this.deedRepository.updateDeed(currentDeed);
  }
}
