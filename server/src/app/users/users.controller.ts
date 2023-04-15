// ========================== nest =====================================
import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

// ========================== swagger ===================================
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

// ========================== entities & dto's ==========================
import { UserSessionDto } from "./dto's/user-session.dto";

// ========================== services ==================================
import { UsersService } from "./users.service";
import { User } from "./decorators/user.decorator";
import { UserByTagDto } from "./dto's/user-by-tag.dto";
import { JwtAuthGuard } from "../security/guards/jwt-auth.guard";

@ApiTags("Users controller")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //=============================== user can get deeds his friends =======================================
  //=============================== user can add user in friendList ======================================
  //=============================== user can create new deed =============================================
  //=============================== user can update his deed =============================================
  //=============================== user can delete his deed =============================================
  //=============================== user can delete his account ==========================================

  @Put("/:userTag")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get user by tag" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserSessionDto,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  async addToFriendList(
    @Param("userTag") userTag: string,
    @User() user: UserSessionDto
  ): Promise<UserSessionDto> {
    const userFromDB = await this.usersService.addToFriendList(
      user,
      userTag
    );
    return await UserSessionDto.fromEntity(userFromDB);
  }

  //=============================== user can get user by tag =============================================
  @Get("/:userTag")
  @ApiOperation({ summary: "Get user by tag" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserByTagDto,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  async getUserByTag(
    @Param("userTag") userTag: string
  ): Promise<UserByTagDto> {
    const userFromDB = await this.usersService.getUserByTag(userTag);
    return await UserByTagDto.fromEntity(userFromDB);
  }
}

// User can get his deeds

// User can get deeds his friends

// User can create new deed

// User can update his deed

// User can delete his deed

//* User can signUp

//* User can signIn

// User can delete his account

//* User can find users by tag
