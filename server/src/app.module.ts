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
// import { AcceptLanguageResolver, I18nModule } from "nestjs-i18n";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(databaseConfig),
    // I18nModule.forRoot({
    //   fallbackLanguage: "en",
    //   loaderOptions: {
    //     path: path.join(__dirname, "/i18n/"),
    //     watch: true,
    //   },
    //   resolvers: [AcceptLanguageResolver],
    // }),
  ],
})
export class AppModule {}
