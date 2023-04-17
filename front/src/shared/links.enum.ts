export enum LinksEnums {
  friends = "Friends",
  deeds = "Deeds",
  account = "Account",
}

export interface ILinks {
  friends: LinksEnums.friends;
  deeds: LinksEnums.deeds;
  account: LinksEnums.account;
}
