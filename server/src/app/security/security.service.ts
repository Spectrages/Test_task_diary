// ========================== nest ==========================
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { I18nContext } from "nestjs-i18n";

// ========================== repository & entities ==========================
import { UsersEntity } from "../users/entities/users.entity";
import { UsersRepository } from "../users/repos/users.repository";

// ========================== dto ==========================
import { UserSessionDto } from "../users/dto's/user-session.dto";
import { TokenDto } from "./dtos/token.dto";

@Injectable()
export class SecurityService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService
  ) {}

  async generateJwt(user: UsersEntity): Promise<TokenDto> {
    const payload = await UserSessionDto.fromEntity(user);
    const token = this.jwtService.sign(payload);
    return { token };
  }

  async getUser(id: string): Promise<UsersEntity> {
    const user = await this.usersRepository.getUserById(id);
    if (!user) {
      throw new HttpException(
        `${I18nContext.current().t("errors.user.userDoesNotExist")}`,
        HttpStatus.NOT_FOUND
      );
    }
    return user;
  }
}
