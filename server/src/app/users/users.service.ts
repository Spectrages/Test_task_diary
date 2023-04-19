// ============================ nest ====================================
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

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
import { SingleDeedEntity } from "./entities/single-deed.entity";
import { UserUpdateDto } from "./dto's/user-update.dto";

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly deedRepository: SingleDeedRepository
  ) {}

  async getAllUsers(): Promise<UsersEntity[]> {
    return await this.userRepository.getAll();
  }

  async getUserByTag(userTag: string): Promise<UsersEntity> {
    return await this.userRepository.getUserByTag(userTag);
  }

  async addToFriendList(
    currentUser: UserSessionDto,
    userTag: string
  ): Promise<UsersEntity> {
    const user = await this.userRepository.getUserById(currentUser._id);

    const newFriend = await this.userRepository.getUserByTag(userTag);

    if (!newFriend)
      throw new HttpException(
        `${I18nContext.current().t("errors.user.userDoesNotExist")}`,
        HttpStatus.NOT_FOUND
      );

    user.friends.push(newFriend.tag);
    return await this.userRepository.updateUser(user);
  }

  async createDeed(
    currentUser: UserSessionDto,
    deed: CreateSingleDeedDto
  ): Promise<UsersEntity> {
    const user = await this.userRepository.getUserById(currentUser._id);
    if (!user)
      throw new HttpException(
        `${I18nContext.current().t("errors.user.userDoesNotExist")}`,
        HttpStatus.NOT_FOUND
      );

    const newDeed = await this.deedRepository.createDeed(deed);
    if (!newDeed)
      throw new HttpException(
        `${I18nContext.current().t("errors.deed.deedDoesNotExist")}`,
        HttpStatus.NOT_FOUND
      );

    user.deeds.push(newDeed._id);
    user.rating += 1;
    return await this.userRepository.updateUser(user);
  }

  async getDeedsByTag(
    userTag: string,
    currentUser: UserSessionDto
  ): Promise<SingleDeedEntity[]> {
    const user = await this.userRepository.getUserByTag(userTag);

    const current = await this.userRepository.getUserById(currentUser._id);
    const friendList = current.friends;

    if (friendList.length < 1)
      throw new HttpException(
        `${I18nContext.current().t("errors.user.noAccess")}`,
        HttpStatus.BAD_REQUEST
      );

    const res = friendList.map((item) => item === user.tag.toString());

    if (res.includes(false))
      throw new HttpException(
        `${I18nContext.current().t("errors.user.noAccess")}`,
        HttpStatus.BAD_REQUEST
      );

    const deedsArray = await this.deedRepository.getAllDeed();
    const deedIdArr = user.deeds.map((item) => item.toString());
    return deedsArray.filter((item) => deedIdArr.includes(item._id.toString()));
  }

  async removeFromFriendList(userTag: string, user: UserSessionDto) {
    const friend = await this.userRepository.getUserByTag(userTag);
    if (!friend)
      throw new HttpException(
        `${I18nContext.current().t("errors.user.userDoesNotExist")}`,
        HttpStatus.NOT_FOUND
      );

    let currentUser = await this.userRepository.getUserById(user._id);

    const newFriends = currentUser.friends.filter(
      (item) => item === friend.tag
    );
    currentUser.friends = newFriends;
    return await this.userRepository.updateUser(currentUser);
  }

  async deleteUser(userId: string): Promise<HttpStatus> {
    return await this.userRepository.deleteUser(userId);
  }

  async deleteDeedById(
    deedId: string,
    user: UserSessionDto
  ): Promise<UsersEntity> {
    const result = await this.deedRepository.deleteById(deedId);
    if (result !== 200)
      throw new HttpException(
        `${I18nContext.current().t("errors.deed.deedDoesNotExist")}`,
        HttpStatus.NOT_FOUND
      );
    const newUser = await this.userRepository.getUserById(user._id);
    const newDeeds = newUser.deeds.filter(
      (item) => item.toString() !== deedId.toString()
    );
    newUser.deeds = newDeeds;
    newUser.rating -= 1;
    return await this.userRepository.updateUser(newUser);
  }

  async updateDeedById(
    deedId: string,
    info: SingleDeedDto
  ): Promise<SingleDeedEntity> {
    const currentDeed = await this.deedRepository.getDeedById(deedId);

    if (!currentDeed)
      throw new HttpException(
        `${I18nContext.current().t("errors.deed.deedDoesNotExist")}`,
        HttpStatus.NOT_FOUND
      );

    Object.assign(currentDeed, info);
    currentDeed.updated = new Date();
    return await this.deedRepository.updateDeed(currentDeed);
  }

  async getDeeds(user: UserSessionDto): Promise<SingleDeedEntity[]> {
    const currentUser = await this.userRepository.getUserById(user._id);
    if (!currentUser)
      throw new HttpException(
        `${I18nContext.current().t("errors.user.userDoesNotExist")}`,
        HttpStatus.NOT_FOUND
      );

    const deedIdArr = currentUser.deeds.map((item) => item.toString());
    const deedsArray = await this.deedRepository.getAllDeed();

    return deedsArray.filter((item) => deedIdArr.includes(item._id.toString()));
  }

  async updateProfile(
    user: UserSessionDto,
    info: UserUpdateDto
  ): Promise<UsersEntity> {
    const currentUser = await this.userRepository.getUserById(user._id);
    if (!currentUser)
      throw new HttpException(
        `${I18nContext.current().t("errors.user.userDoesNotExist")}`,
        HttpStatus.NOT_FOUND
      );
    const usersByEmail = info.email
      ? await this.userRepository.getUsersArrayByEmail(info.email)
      : null;
    const usersByTag = info.tag
      ? await this.userRepository.getUsersArrayByTag(info.tag)
      : null;

    if (
      usersByEmail?.length &&
      (usersByEmail.length > 1 ||
        usersByEmail[0]?._id.toString() !== user._id.toString())
    )
      throw new HttpException(
        `${I18nContext.current().t(`errors.user.userAlreadyExist`)}: ${
          info.email
        }`,
        HttpStatus.BAD_REQUEST
      );

    if (
      usersByTag?.length &&
      (usersByTag.length > 1 ||
        usersByTag[0]?._id.toString() !== user._id.toString())
    )
      throw new HttpException(
        `${I18nContext.current().t(`errors.user.userAlreadyExist`)}: ${
          info.tag
        }`,
        HttpStatus.BAD_REQUEST
      );

    currentUser.updated = new Date();
    Object.assign(currentUser, info);
    return await this.userRepository.updateUser(currentUser);
  }

  async getProfile(user: UserSessionDto): Promise<UsersEntity> {
    return await this.userRepository.getUserById(user._id);
  }

  async getSingleDeedById(
    user: UserSessionDto,
    deedId: string
  ): Promise<SingleDeedEntity> {
    const currentUser = await this.userRepository.getUserById(user._id);
    if (!currentUser)
      throw new HttpException(
        `${I18nContext.current().t("errors.user.userDoesNotExist")}`,
        HttpStatus.NOT_FOUND
      );
    return await this.deedRepository.getDeedById(deedId);
  }

  async getFriends(user: UserSessionDto) {
    const currentUser = await this.userRepository.getUserById(user._id);
    if (!currentUser)
      throw new HttpException(
        `${I18nContext.current().t("errors.user.userDoesNotExist")}`,
        HttpStatus.NOT_FOUND
      );

    const friendsTags = currentUser.friends.map((item) => item.toString());
    const usersList = await this.userRepository.getAll();
    return usersList.filter((item) =>
      friendsTags.includes(item.tag.toString())
    );
  }
}
