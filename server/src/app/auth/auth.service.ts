// ========================== nest ==========================
import {
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { I18nContext } from "nestjs-i18n";

// ========================== bcrypt ==========================
//! This lib could be turned on in case it necessary to hash passwords
// import { compare, hashSync } from "bcrypt";

// ========================== dto ==========================
import { UserSignInDto } from "./dtos/user-sign-in.dto";
import { TokenDto } from "../security/dtos/token.dto";
import { UserCreateDto } from "../users/dto's/user-create.dto";
import { UserSignUpDto } from "./dtos/user-sign-up.dto";

// ========================== repositories ==============================
import { UsersRepository } from "../users/repos/users.repository";

// ========================== enums =====================================

// ========================== services ====================
import { SecurityService } from "../security/security.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly securityService: SecurityService
  ) {}

  // ========================== signUp ==============================
  async signUp(dto: UserSignUpDto): Promise<TokenDto> {
    const userFromDB = await this.usersRepository.getUserByEmail(
      dto.email
    );
    const userFromDBTag = await this.usersRepository.getUserByTag(
      dto.tag
    );
    if (userFromDB || userFromDBTag)
      throw new HttpException(
        `${I18nContext.current().t(
          `errors.user.userAlreadyExist`
        )}: ${dto.email}`,
        HttpStatus.BAD_REQUEST
      );

    if (userFromDB)
      throw new HttpException("Error", HttpStatus.BAD_REQUEST);

    // //! Line below could be activited on in case it neccessary to hash passwords
    // // const hashPassword = await hashSync(dto.password, 6);

    const userForDB: UserCreateDto = {
      email: dto.email,
      password: dto.password,
      tag: dto.tag,
      rating: 0,
      deeds: [],
      friends: [],
    };

    const newUser = await this.usersRepository.createUser(userForDB);

    const access_token = await this.securityService.generateJwt(
      newUser
    );
    return access_token;
  }

  // ========================== signIn ==============================
  async signIn(dto: UserSignInDto): Promise<TokenDto> {
    const userFromDB = await this.usersRepository.getUserByEmail(
      dto.email
    );

    if (!userFromDB) {
      throw new HttpException(
        `${I18nContext.current().t("errors.user.userDoesNotExist")}`,
        HttpStatus.NOT_FOUND
      );
    }

    //! Line below could be activited on in case it neccessary to hash passwords
    // const isPasswordCorrect = await compare(dto.password, userFromDB.password);
    const isPasswordCorrect = dto.password === userFromDB.password;

    if (!isPasswordCorrect)
      throw new HttpException(
        I18nContext.current().t("errors.authorization.unAuthorized"),
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    const access_token = await this.securityService.generateJwt(
      userFromDB
    );
    return access_token;
  }
}
