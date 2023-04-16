// ========================== nest ======================================
import { Module, forwardRef } from "@nestjs/common";

// ========================== typeorm ===================================
import { TypeOrmModule } from "@nestjs/typeorm";

// ========================== entities ==================================
import { UsersEntity } from "./entities/users.entity";

// ========================== repositories ==============================
import { UsersRepository } from "./repos/users.repository";
import { SingleDeedRepository } from "./repos/deed.repository";

// ========================== services & controllers ====================
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { SingleDeedEntity } from "./entities/single-deed.entity";
import { SecurityModule } from "../security/security.module";

// ========================== modules ===================================

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, SingleDeedEntity]),
    forwardRef(() => SecurityModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, SingleDeedRepository],
  exports: [UsersService],
})
export class UserModule {}
