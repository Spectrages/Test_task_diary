// ========================== nest ==========================
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import { HttpException } from "@nestjs/common";

// ========================== dto & mock ==========================
import { UserSessionDto } from "../../users/dto's/user-session.dto";
import { usersEntity } from "./data.mock";

// ========================== repository ==========================
import { UsersRepository } from "../../users/repos/users.repository";

// ========================== security ==========================
import { JwtStrategy } from "../jwt.strategy";
import { SecurityService } from "../security.service";
import { ObjectID } from "typeorm";

jest.mock("nestjs-i18n", () => ({
  I18nContext: {
    current: () => ({
      t: () => "text",
    }),
  },
}));

describe("Security service", () => {
  let securityService: SecurityService;

  const mockedUserRepository = {
    getById: jest.fn().mockResolvedValue(usersEntity),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.register({
          secret: "process.env.PRIVATE_KEY",
          signOptions: { expiresIn: "3600s" },
        }),
      ],
      providers: [
        SecurityService,
        JwtStrategy,
        {
          provide: UsersRepository,
          useValue: mockedUserRepository,
        },
      ],
    }).compile();

    securityService = await module.get(SecurityService);
  });

  it("should be defined", () => {
    expect(securityService).toBeDefined();
  });

  describe("method 'generateJwt'", () => {
    it("should return jwt", async () => {
      const result = await securityService.generateJwt(usersEntity);

      expect(result).toBeDefined();

      const jwt = new JwtService();
      const decodedToken = jwt.decode(result.token);

      expect(decodedToken).toMatchObject(
        UserSessionDto.fromEntity(usersEntity)
      );
    });
  });

  it("should be return error", async () => {
    mockedUserRepository.getById = jest.fn().mockResolvedValue(false);
    try {
      await securityService.getUser("id");
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError);
    }
  });
});
