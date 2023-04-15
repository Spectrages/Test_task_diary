// ========================== nest ==========================
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// ========================== entities ==========================
import { UsersEntity } from "../users/entities/users.entity";

// ========================== repositories ==============================
import { UsersRepository } from "../users/repos/users.repository";

// ========================== srvices & controllers ====================
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

// ========================== modules ===================================
import { SecurityModule } from "../security/security.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersEntity,
    ]),
    SecurityModule,
  ],
  providers: [
    AuthService,
    UsersRepository,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
