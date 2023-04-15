import * as dotenv from "dotenv";
dotenv.config();

// ========================== nest ==========================
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

// ========================== jwt ==========================
import { JwtStrategy } from "./jwt.strategy";

// ========================== services & controllers ==========================
import { SecurityService } from "./security.service";

// ================================= entities ================================
import { UsersEntity } from "../users/entities/users.entity";

// ================================== repository ==================================
import { UsersRepository } from "../users/repos/users.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersEntity,
    ]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: 'process.env.PRIVATE_KEY',
      signOptions: { expiresIn: "3600s" },
    }),
  ],
  controllers: [],
  providers: [
    SecurityService,
    JwtStrategy,
    UsersRepository,
  ],
  exports: [SecurityService],
})
export class SecurityModule {}
