// ========================== types ==========================
import { UUIDDto } from "../../../shared/uuid-dto.type";

export interface UserFromTokenDto extends UUIDDto {
  _id: string;
  email: string;
  firstname: string;
  middlename: string;
  lastname: string;
  tag: string;
  deeds: [];
  friends: [];
  rating: number;
  exp: number;
  iat: number;
}
