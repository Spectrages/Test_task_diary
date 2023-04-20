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
import { UserCreateDto } from "./dto's/user-create.dto";
import { UserUpdateDto } from "./dto's/user-update.dto";

@ApiTags("Users controller")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // *BLOCK WITH GET REQUESTS
  //=============================== user can get deeds his friend ========================================
  @Get("/friends/deeds/:userTag")
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
  ): Promise<SingleDeedEntity[]> {
    return await this.usersService.getDeedsByTag(userTag, user);
  }

  //=============================== user can get his friend-list ================================================
  @Get("/friends")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "user can get his friend-list" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserSessionDto,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  async getFriends(@User() user: UserSessionDto): Promise<UserSessionDto[]> {
    const usersFromDB = await this.usersService.getFriends(user);
    return usersFromDB.map((item) => UserSessionDto.fromEntity(item));
  }

  //=============================== user can get his deeds ================================================
  @Get("/deeds")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get a his deeds" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserSessionDto,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  async getDeeds(@User() user: UserSessionDto): Promise<SingleDeedEntity[]> {
    return await this.usersService.getDeeds(user);
  }

  //=============================== user can get single deed by id ================================================
  @Get("/deeds/:deedId")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "user can get single deed by id" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserSessionDto,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  async getSingleDeedById(
    @User() user: UserSessionDto,
    @Param("deedId") deedId: string
  ): Promise<SingleDeedEntity> {
    return await this.usersService.getSingleDeedById(user, deedId);
  }

  //=============================== user can get his profile ================================================
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "User can get his profile" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserSessionDto,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  async getProfile(@User() user: UserSessionDto): Promise<UserSessionDto> {
    const userFromDB = await this.usersService.getProfile(user);
    return await UserSessionDto.fromEntity(userFromDB);
  }

  //=============================== get all =============================================
  @Get("/all")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserByTagDto,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  async getAllUsers(@User() user: UserSessionDto): Promise<UserSessionDto[]> {
    const usersFromDB = await this.usersService.getAllUsers(user);
    return usersFromDB.map((user) => UserSessionDto.fromEntity(user));
  }

  //=============================== get one =============================================
  @Get("/:userId")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserByTagDto,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  async getUserById(@Param("userId") userId: string): Promise<UserSessionDto> {
    const usersFromDB = await this.usersService.getUserById(userId);
    return UserSessionDto.fromEntity(usersFromDB);
  }

  //  *BLOCK WITH POST REQUESTS
  //=============================== user can create new deed =============================================
  @Post("/deeds")
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
    const userWithDeedFromDB = await this.usersService.createDeed(user, deed);
    return await UserSessionDto.fromEntity(userWithDeedFromDB);
  }

  // *BLOCK WITH PUT REQUESTS
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
    @Param("deedId") deedId: string,
    @Body() info: SingleDeedDto
  ): Promise<SingleDeedEntity> {
    return await this.usersService.updateDeedById(deedId, info);
  }

  //=============================== user can update his profile =============================================
  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Update profile" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserSessionDto,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  async updateProfile(
    @User() user: UserSessionDto,
    @Body() info: UserUpdateDto
  ): Promise<UserSessionDto> {
    const userFromDB = await this.usersService.updateProfile(user, info);
    return await UserSessionDto.fromEntity(userFromDB);
  }

  //=============================== user can add user in friendList ======================================
  @Put("/friends/:userTag")
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
  ): Promise<UserSessionDto> {
    const userFromDB = await this.usersService.addToFriendList(user, userTag);
    return await UserSessionDto.fromEntity(userFromDB);
  }

  //=============================== user can remove his friend ===========================================
  @Put("/friends/remove/:userTag")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Remove friend" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserSessionDto,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  async removeFromFriendList(
    @User() user: UserSessionDto,
    @Param("userTag") userTag: string
  ): Promise<UserSessionDto> {
    const userFromDB = await this.usersService.removeFromFriendList(
      userTag,
      user
    );
    return await UserSessionDto.fromEntity(userFromDB);
  }

  // *BLOCK WITH DELETE REQUESTS
  //=============================== user can delete his deed =============================================
  @Delete("/deeds/:deedId")
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
    @Param("deedId") deedId: string
  ): Promise<UserSessionDto> {
    const userFromDB = await this.usersService.deleteDeedById(deedId, user);
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
  async deleteUser(@User() user: UserSessionDto): Promise<HttpStatus> {
    return await this.usersService.deleteUser(user._id);
  }
}
