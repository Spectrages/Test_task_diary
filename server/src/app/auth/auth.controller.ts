// ========================== nest ==========================
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

// ========================== dto & enum ==========================
import { UserSignInDto } from "./dtos/user-sign-in.dto";
import { TokenDto } from "../security/dtos/token.dto";
import { UserSignUpDto } from "./dtos/user-sign-up.dto";
import { UserSessionDto } from "../users/dto's/user-session.dto";

// ========================== services ====================
import { AuthService } from "./auth.service";
import { SecurityService } from "../security/security.service";

// ========================== decorators ====================
import { User } from "../users/decorators/user.decorator";

@ApiTags("Authentification")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly securityService: SecurityService
  ) {}

  @Post("/signUp")
  @ApiOperation({ summary: "Sign up with email, password and other" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "UserWithDetailsDto",
    type: TokenDto,
  })
  @UsePipes(new ValidationPipe())
  async signUp(@Body() userDto: UserSignUpDto): Promise<TokenDto> {
    return await this.authService.signUp(userDto);
  }

  @Post("/signIn")
  @ApiOperation({ summary: "Sign in with email and password" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: TokenDto,
  })
  @UsePipes(new ValidationPipe())
  async signIn(@Body() userSignIn: UserSignInDto): Promise<TokenDto> {
    return await this.authService.signIn(userSignIn);
  }

  @Get("/refresh-token")
  async refreshToken(
    @User() currentUser: UserSessionDto
  ): Promise<TokenDto> {
    const user = await this.securityService.getUser(currentUser._id);
    return await this.securityService.generateJwt(user);
  }
}
