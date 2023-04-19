export enum LinksEnums {
  profile = "Profile",
  deeds = "Deeds",
  friends = "Friends",
}

export interface ILinks {
  friends: LinksEnums.friends;
  deeds: LinksEnums.deeds;
  profile: LinksEnums.profile;
}
