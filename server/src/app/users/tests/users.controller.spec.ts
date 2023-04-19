// ============================ nest ====================================
import { Test, TestingModule } from "@nestjs/testing";

// ========================== services & controllers ====================
import { UsersController } from "../users.controller";
import { UsersService } from "../users.service";

// ============================== guards ================================
import { JwtAuthGuard } from "../../security/guards/jwt-auth.guard";

import { HttpStatus } from "@nestjs/common";

// ============================== mocks =================================
import {
  defaultUser,
  defaultUserWithoutPass,
  mockedServices,
  singleDeed,
  userByTag,
  userSessionDto,
  userWithDeeds,
  userWithFriends,
} from "./mocks/data.mock";
import { ObjectID } from "mongodb";

describe("User controller", () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockedServices)

      .overrideGuard(JwtAuthGuard)
      .useValue(true)

      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("endpoint: Get deeds by tag", () => {
    it("should be return array with deeds", async () => {
      expect(
        await controller.getDeedsByTag("CoolMan1", userSessionDto)
      ).toEqual([singleDeed]);
    });
  });

  describe("endpoint: Get all deeds", () => {
    it("should be return array specific user deeds", async () => {
      expect(await controller.getDeeds(userSessionDto)).toEqual([
        singleDeed,
      ]);
    });
  });

  // describe("endpoint: Get user profile by tag", () => {
  //   it("should be return specific user", async () => {
  //     expect(await controller.getUserByTag("CoolMan1")).toEqual(
  //       userByTag
  //     );
  //   });
  // });

  describe("endpoint: Create new deed", () => {
    it("should be return user with new deed", async () => {
      expect(
        await controller.createDeed(singleDeed, defaultUser)
      ).toEqual(userWithDeeds);
    });
  });

  describe("endpoint: Add to friend list", () => {
    it("should be return user with new friend", async () => {
      expect(
        await controller.addToFriendList("Friend", userSessionDto)
      ).toEqual(userWithFriends);
    });
  });

  describe("endpoint: Delete deed by id", () => {
    it("should be return user with new friend", async () => {
      expect(
        await controller.deleteDeed(
          userSessionDto,
          new ObjectID("643bf13dad4cfb3304f2be8a")
        )
      ).toEqual(defaultUserWithoutPass);
    });
  });

  describe("endpoint: Delete user", () => {
    it("should be return HttpStatus: OK", async () => {
      expect(await controller.deleteUser(userSessionDto)).toEqual(
        HttpStatus.OK
      );
    });
  });

  describe("endpoint: Remove user from friend list", () => {
    it("should be return user without friend", async () => {
      expect(
        await controller.removeFromFriendList(
          userSessionDto,
          "Friend"
        )
      ).toEqual(defaultUserWithoutPass);
    });
  });
});
