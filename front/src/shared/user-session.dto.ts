import { UUIDDto } from "./uuid-dto.type";

export interface UserSessionDto extends UUIDDto {
  email: string;
  firstname: string;
  middlename: string;
  lastname: string;
  tag: string;
  rating?: number;
  deeds: [];
  friends: [];
}
