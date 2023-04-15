// ========================== nest ==========================
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { I18nContext } from "nestjs-i18n";

// ========================== services ==========================
import { SecurityService } from "../security.service";

// ========================== types ==============================
import { IRequest } from "../../../shared/types/request.interface";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly securityService: SecurityService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequest>();
    return true;

    // const user = await this.securityService.getUser(request.user.id);
    // if (!user) {
    //     throw new HttpException(
    //         I18nContext.current().t("errors.user.userDoesNotExist"),
    //         HttpStatus.BAD_REQUEST
    //     );
    // }
    // throw new HttpException(
    //     I18nContext.current().t("errors.authorization.unAuthorized"),
    //     HttpStatus.UNAUTHORIZED
    // );
  }
}
