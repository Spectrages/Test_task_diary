// ============================ path ====================================
import * as path from "path";

// ============================ nest ====================================
import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";

// ============================ config ==================================
import { ConfigModule } from "@nestjs/config";
import databaseConfig from "./config/database.config";

// ============================ i18n ====================================
import { AcceptLanguageResolver, I18nModule } from "nestjs-i18n";

// ============================ modules ==================================
import { UserModule } from "./app/users/users.module";
import { AuthModule } from "./app/auth/auth.module";
import { SecurityModule } from "./app/security/security.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    ScheduleModule.forRoot(),
    I18nModule.forRoot({
      fallbackLanguage: "en",
      loaderOptions: {
        path: path.join(__dirname, "/i18n/"),
        watch: true,
      },
      resolvers: [AcceptLanguageResolver],
    }),
    UserModule,
    AuthModule,
    SecurityModule,
  ],
})
export class AppModule {}
