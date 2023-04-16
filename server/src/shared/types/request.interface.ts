// ========================== express ========================
import { Request } from "express";

// ========================== dto's ==========================
import { UserSessionDto } from "../../app/users/dto's/user-session.dto";

export interface IRequest extends Request {
  user?: UserSessionDto;
}
