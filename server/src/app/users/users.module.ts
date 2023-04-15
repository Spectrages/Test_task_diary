// ========================== nest ======================================
import { Module } from "@nestjs/common";

// ========================== typeorm ===================================
import { TypeOrmModule } from "@nestjs/typeorm";

// ========================== entities ==================================
import { UsersEntity } from "./entities/users.entity";

// ========================== repositories ==============================
import { UsersRepository } from "./repos/users.repository";

// ========================== services & controllers ====================
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

// ========================== modules ===================================

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UserModule {}
