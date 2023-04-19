export interface UserDto {
  _id: string;
  email: string;
  firstname: string;
  middlename: string;
  lastname: string;
  tag: string;
  friends: [];
  deeds: [];
  rating: number;
  created: number;
  updated: number;
}
