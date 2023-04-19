export interface UserUpdateDto {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  middlename: string;
  tag: string;
  friends: [];
  deeds: [];
  rating: number;
  created: number;
  updated: number;
}
