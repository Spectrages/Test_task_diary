// ========================== nest =====================================
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

// ========================== swagger ===================================
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

// ========================== entities & dto's ==========================
import { UserSessionDto } from "./dto's/user-session.dto";
import { CreateSingleDeedDto } from "./dto's/deed-create.dto";
import { UserByTagDto } from "./dto's/user-by-tag.dto";

// ========================== services ==================================
import { UsersService } from "./users.service";

// ========================== guards & decorators =======================
import { JwtAuthGuard } from "../security/guards/jwt-auth.guard";
import { User } from "./decorators/user.decorator";
import { ObjectID } from "typeorm";
import { SingleDeedDto } from "./dto's/deed.dto";
import { SingleDeedEntity } from "./entities/single-deed.entity";

@ApiTags("Users controller")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //=============================== user can update his deed =============================================
  @Put("/deeds/:deedId")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Update deed" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserSessionDto,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  async updateDeed(
    @User() user: UserSessionDto,
    @Param("deedId") deedId: ObjectID,
    @Body() info: SingleDeedDto
  ): Promise<SingleDeedEntity> {
    return await this.usersService.updateDeedById(deedId, user, info);
  }

  //=============================== user can delete his deed =============================================
  @Delete("/:deedId")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Delete deed" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserSessionDto,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  async deleteDeed(
    @User() user: UserSessionDto,
    @Param("deedId") deedId: ObjectID
  ): Promise<UserSessionDto> {
    const userFromDB = await this.usersService.deleteDeedById(
      deedId,
      user
    );
    return await UserSessionDto.fromEntity(userFromDB);
  }
  //=============================== user can delete his account ==========================================
  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Delete account" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserSessionDto,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  async deleteUser(
    @User() user: UserSessionDto
  ): Promise<HttpStatus> {
    return await this.usersService.deleteUser(user);
  }

  //=============================== user can delete his friend ===========================================
  @Delete("/:userTag")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Delete friend" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserSessionDto,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  async deleteUserByTag(
    @User() user: UserSessionDto,
    @Param("userTag") userTag: string
  ): Promise<UserSessionDto> {
    const userFromDB = await this.usersService.removeFromFriendList(
      userTag,
      user
    );
    return await UserSessionDto.fromEntity(userFromDB);
  }

  //=============================== user can get deeds his friend ========================================
  @Get("/:userTag/deeds")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get a friend's deeds" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserSessionDto,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  async getDeedsByTag(
    @Param("userTag") userTag: string,
    @User() user: UserSessionDto
  ): Promise<ObjectID[]> {
    return await this.usersService.getDeedsByTag(userTag, user);
  }

  //=============================== user can create new deed =============================================
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Create new deed" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserSessionDto,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  async createDeed(
    @Body() deed: CreateSingleDeedDto,
    @User() user: UserSessionDto
  ): Promise<UserSessionDto> {
    const userWithDeedFromDB = await this.usersService.createDeed(
      user,
      deed
    );
    return await UserSessionDto.fromEntity(userWithDeedFromDB);
  }

  //=============================== user can add user in friendList ======================================
  @Put("/:userTag")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Add user in friend list" })
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
  ) {
    const userFromDB = await this.usersService.addToFriendList(
      user,
      userTag
    );
    return await UserSessionDto.fromEntity(userFromDB);
  }

  //=============================== user can get user by tag =============================================
  @Get("/:userTag")
  @UseGuards(JwtAuthGuard)
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
