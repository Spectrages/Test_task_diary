// =========================== types ===========================
import { UUIDDto } from "./uuid-dto.type";

export interface UserSessionDto extends UUIDDto {
  _id: string;
  email: string;
  firstname: string;
  middlename: string;
  lastname: string;
  tag: string;
  rating?: number;
  deeds: [];
  friends: [];
}
