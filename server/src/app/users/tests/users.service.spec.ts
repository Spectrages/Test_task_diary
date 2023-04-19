// ============================ nest ====================================
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { HttpException, HttpStatus } from "@nestjs/common";

// ============================ services ================================
import { UsersService } from "../users.service";

// ========================== repositories ==============================
import { UsersRepository } from "../repos/users.repository";
import { SingleDeedRepository } from "../repos/deed.repository";

// ============================== mocks =================================
import {
  usersRepositoryFake,
  deedRepositoryFake,
  userSessionDto,
  userWithFriends,
  defaultFriend,
  defaultUser,
  singleDeed,
  userByTag,
  userWithDeeds,
  userWithFriendWithDeeds,
} from "./mocks/data.mock";
import { ObjectID } from "mongodb";

jest.mock("nestjs-i18n", () => ({
  I18nContext: {
    current: () => ({
      t: () => "text",
    }),
  },
}));

describe("User service", () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UsersRepository),
          useValue: usersRepositoryFake,
        },
        {
          provide: getRepositoryToken(SingleDeedRepository),
          useValue: deedRepositoryFake,
        },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("method: Add to friend list", () => {
    it("should be return user with new friend", async () => {
      usersRepositoryFake.getUserById = jest
        .fn()
        .mockResolvedValue(defaultUser);
      usersRepositoryFake.getUserByTag = jest
        .fn()
        .mockResolvedValue(defaultFriend);

      const dto = {
        _id: new ObjectID("643bf13dad4cfb3304f2be9a"),
        created: 123123123,
        deeds: [],
        email: "test1@test.com",
        friends: ["Friend"],
        password: "123123123",
        rating: 0,
        tag: "CoolMan1",
        updated: 123123123123,
      };
      expect(await service.addToFriendList(userSessionDto, "CoolMan2")).toEqual(
        dto
      );
    });

    it("should be return error: user not found", async () => {
      usersRepositoryFake.getUserByTag = jest.fn().mockResolvedValue(false);
      try {
        await service.getUserByTag("");
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe("method: Get user by tag", () => {
    it("should be return specific user by tag", async () => {
      usersRepositoryFake.getUserByTag = jest.fn().mockResolvedValue(userByTag);
      expect(await service.getUserByTag("CoolMan1")).toEqual(userByTag);
    });
  });

  describe("method: Delete specific deed by id", () => {
    it("should be return user without specific deed", async () => {
      deedRepositoryFake.deleteById = jest
        .fn()
        .mockResolvedValue(HttpStatus.OK);
      usersRepositoryFake.getUserById = jest
        .fn()
        .mockResolvedValue(userWithDeeds);
      expect(
        await service.deleteDeedById(
          new ObjectID("643bf13dad4cfb3304f2be8a"),
          userSessionDto
        )
      ).toEqual(defaultUser);
    });

    it("should be return error: deedDoesNotExist", async () => {
      deedRepositoryFake.deleteById = jest
        .fn()
        .mockResolvedValue(HttpStatus.BAD_REQUEST);
      usersRepositoryFake.getUserById = jest
        .fn()
        .mockResolvedValue(userWithDeeds);

      try {
        await service.deleteDeedById(
          new ObjectID("643bf13dad4cfb3304f2be86"),
          userSessionDto
        );
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe("method: Delete user account", () => {
    it("should be return HTTPStatus OK", async () => {
      expect(await service.deleteUser(userSessionDto._id)).toEqual(
        HttpStatus.OK
      );
    });
  });

  describe("method: Create new deed", () => {
    it("should be return user with new deed", async () => {
      const dto = {
        _id: new ObjectID("643bf13dad4cfb3304f2be9a"),
        created: 123123123,
        deeds: [new ObjectID("643bf13dad4cfb3304f2be8a")],
        email: "test1@test.com",
        friends: ["Friend"],
        password: "123123123",
        rating: 0,
        tag: "CoolMan1",
        updated: 123123123123,
      };
      usersRepositoryFake.getUserById = jest
        .fn()
        .mockResolvedValue(defaultUser);
      deedRepositoryFake.createDeed = jest.fn().mockResolvedValue(singleDeed);
      expect(await service.createDeed(userSessionDto, singleDeed)).toEqual(dto);
    });

    it("should be return error: user not found", async () => {
      usersRepositoryFake.getUserById = jest.fn().mockResolvedValue(false);
      deedRepositoryFake.createDeed = jest.fn().mockResolvedValue(singleDeed);

      try {
        await service.createDeed(userSessionDto, singleDeed);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });

    it("should be return error: deed not found", async () => {
      usersRepositoryFake.getUserById = jest
        .fn()
        .mockResolvedValue(defaultUser);
      deedRepositoryFake.createDeed = jest.fn().mockResolvedValue(false);

      try {
        await service.createDeed(userSessionDto, singleDeed);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe("method: Get all deeds", () => {
    it("should be return array with deeds", async () => {
      usersRepositoryFake.getUserById = jest
        .fn()
        .mockResolvedValue(userWithDeeds);
      deedRepositoryFake.getAllDeed = jest.fn().mockResolvedValue([singleDeed]);

      expect(await service.getDeeds(userSessionDto)).toEqual([singleDeed]);
    });

    it("should be return error: user does not exist", async () => {
      usersRepositoryFake.getUserById = jest.fn().mockResolvedValue(false);
      deedRepositoryFake.getAllDeed = jest.fn().mockResolvedValue([singleDeed]);
      try {
        await service.getDeeds(userSessionDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe("method: Get deeds by user tag", () => {
    it("should be return array with deeds for specific user", async () => {
      usersRepositoryFake.getUserByTag = jest
        .fn()
        .mockResolvedValue(userWithDeeds);

      usersRepositoryFake.getUserById = jest
        .fn()
        .mockResolvedValue(userWithFriendWithDeeds);

      expect(
        await service.getDeedsByTag("UserWithDeed", userWithFriendWithDeeds)
      ).toEqual([singleDeed]);
    });

    it("should be return error: no access", async () => {
      usersRepositoryFake.getUserById = jest
        .fn()
        .mockResolvedValue(defaultUser);
      usersRepositoryFake.getUserByTag = jest
        .fn()
        .mockResolvedValue(userWithDeeds);

      try {
        await service.getDeedsByTag("fake", userSessionDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe("method: removeFromFriendList", () => {
    it("should be return user without friend", async () => {
      usersRepositoryFake.getUserByTag = jest
        .fn()
        .mockResolvedValue(defaultFriend);

      usersRepositoryFake.getUserById = jest
        .fn()
        .mockResolvedValue(userWithFriends);

      expect(
        await service.removeFromFriendList(defaultFriend.tag, userWithFriends)
      ).toEqual(defaultUser);
    });

    it("should be return error: userDoesNotExist", async () => {
      usersRepositoryFake.getUserByTag = jest.fn().mockResolvedValue(false);

      usersRepositoryFake.getUserById = jest
        .fn()
        .mockResolvedValue(userWithFriends);

      try {
        await service.removeFromFriendList("", userWithFriends);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe("method: update single deed", () => {
    it("should be return user with changing deed", async () => {
      deedRepositoryFake.getDeedById = jest.fn().mockResolvedValue(singleDeed);

      usersRepositoryFake.getUserById = jest
        .fn()
        .mockResolvedValue(userWithDeeds);

      expect(await service.updateDeedById(singleDeed._id, singleDeed)).toEqual(
        singleDeed
      );
    });

    it("should be return error: deedDoesNotExist", async () => {
      deedRepositoryFake.getDeedById = jest.fn().mockResolvedValue(false);
      usersRepositoryFake.getUserById = jest
        .fn()
        .mockResolvedValue(userWithDeeds);
      try {
        await service.updateDeedById(singleDeed._id, singleDeed);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });
});
