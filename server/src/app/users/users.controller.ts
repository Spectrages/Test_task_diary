// ========================== nest =====================================
import {
  Controller,
  Get,
  HttpStatus,
  Param,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

// ========================== swagger ===================================
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

// ========================== entities & dto's ==========================
import { UserSessionDto } from "./dto's/user-session.dto";

// ========================== services ==================================
import { UsersService } from "./users.service";

@ApiTags("Users controller")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //=============================== get user by tag ===============================================
  @Get("")
  @ApiOperation({ summary: "Get user by tag" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "HttpStatus:200:OK",
    type: UserSessionDto,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  async getUserByTag(
    @Param("userTag") userTag: string
  ): Promise<UserSessionDto> {
    const userFromDB = await this.usersService.getUserByTag(userTag);
    return await UserSessionDto.fromEntity(userFromDB);
  }
}
