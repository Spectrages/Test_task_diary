import { HttpStatus } from "@nestjs/common";
import { ObjectID } from "mongodb";

export const singleDeed = {
  _id: new ObjectID("643bf13dad4cfb3304f2be8a"),
  created: 123123123,
  updated: 123123123123,
  name: "Good1",
  description: "Good test",
};

export const userSessionDto = {
  _id: new ObjectID("643bf13dad4cfb3304f2be9a"),
  created: 123123123,
  updated: 123123123123,
  email: "test1@test.com",
  password: "123123123",
  tag: "CoolMan1",
  rating: 0,
  deeds: [],
  friends: [],
};

export const defaultUser = {
  _id: new ObjectID("643bf13dad4cfb3304f2be9a"),
  created: 123123123,
  updated: 123123123123,
  email: "test1@test.com",
  password: "123123123",
  tag: "CoolMan1",
  rating: 0,
  deeds: [],
  friends: [],
};

export const defaultUserWithoutPass = {
  _id: new ObjectID("643bf13dad4cfb3304f2be9a"),
  created: 123123123,
  updated: 123123123123,
  email: "test1@test.com",
  tag: "CoolMan1",
  rating: 0,
  deeds: [],
  friends: [],
};

export const defaultFriend = {
  _id: new ObjectID("643bf13dad4cfb3304f3be9a"),
  created: 123123123,
  updated: 123123123123,
  email: "test2@test.com",
  password: "123123123",
  tag: "Friend",
  rating: 0,
  deeds: [],
  friends: [],
};

export const userWithFriends = {
  _id: new ObjectID("643bf13dad4cfb3304f2be9a"),
  created: 123123123,
  updated: 123123123123,
  email: "test1@test.com",
  tag: "CoolMan1",
  rating: 0,
  deeds: [],
  friends: ["Friend"],
};

export const userWithDeeds = {
  _id: new ObjectID("643bf13dad4cfb3304f2be9a"),
  created: 123123123,
  updated: 123123123123,
  email: "test1@test.com",
  tag: "UserWithDeed",
  rating: 0,
  deeds: [new ObjectID("643bf13dad4cfb3304f2be8a")],
  friends: [],
};

export const userWithFriendWithDeeds = {
  _id: new ObjectID("643bf13dad4cfb3304f2be9a"),
  created: 123123123,
  updated: 123123123123,
  email: "test2@test.com",
  tag: "CoolMan2",
  rating: 0,
  deeds: [],
  friends: ["UserWithDeed"],
};

export const userByTag = {
  _id: new ObjectID("643bf13dad4cfb3304f2be9a"),
  created: 123123123,
  rating: 0,
  tag: "CoolMan1",
  updated: 123123123123,
};

export const mockedServices = {
  getDeedsByTag: jest.fn().mockResolvedValue([singleDeed]),
  getDeeds: jest.fn().mockResolvedValue([singleDeed]),
  getUserByTag: jest.fn().mockResolvedValue(userByTag),

  createDeed: jest.fn().mockResolvedValue(userWithDeeds),

  updateDeed: jest.fn().mockResolvedValue(userWithDeeds),
  addToFriendList: jest.fn().mockResolvedValue(userWithFriends),

  deleteDeedById: jest.fn().mockResolvedValue(defaultUserWithoutPass),

  deleteUser: jest.fn().mockResolvedValue(HttpStatus.OK),

  removeFromFriendList: jest.fn().mockResolvedValue(defaultUserWithoutPass),
};

export const usersRepositoryFake = {
  createUser: jest.fn().mockResolvedValue(defaultUser),
  getUserById: jest.fn().mockResolvedValue(defaultUser),
  getUserByTag: jest.fn().mockResolvedValue(userByTag),
  getUserByEmail: jest.fn().mockResolvedValue(defaultUser),
  updateUser: jest.fn().mockResolvedValue(defaultUser),
  deleteUser: jest.fn().mockResolvedValue(HttpStatus.OK),
};

export const deedRepositoryFake = {
  createDeed: jest.fn().mockResolvedValue(singleDeed),
  deleteById: jest.fn().mockResolvedValue(singleDeed),
  getDeedById: jest.fn().mockResolvedValue(singleDeed),
  updateDeed: jest.fn().mockResolvedValue(singleDeed),
  getAllDeed: jest.fn().mockResolvedValue([singleDeed]),
};
