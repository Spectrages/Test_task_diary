// ========================== nest ===============================
import { Test } from "@nestjs/testing";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { getRepositoryToken } from "@nestjs/typeorm";
import { BadRequestException } from "@nestjs/common";

// ========================== service =============================
import { AuthService } from "../auth.service";
import { SecurityService } from "../../security/security.service";

// ========================== repository ==========================
import { UsersRepository } from "../../users/repos/users.repository";

// ========================== dto's ===============================
import { TokenDto } from "../../security/dtos/token.dto";
import { UserSignInDto } from "../dtos/user-sign-in.dto";

jest.mock("nestjs-i18n", () => ({
  I18nContext: {
    current: () => ({
      t: () => "text",
    }),
  },
}));

describe("AuthService methods", () => {
  let authService: AuthService;

  const user = {
    id: "213123123",
    email: "test@gmail.com",
    password: "123456789",
    created: new Date(),
    updated: new Date(),
  };

  const mockUserRepository = {
    getUserByEmail: jest.fn().mockResolvedValue(user),
    createUser: jest.fn().mockResolvedValue(user),
    getById: jest.fn().mockResolvedValue(user),
  };

  const mockSecurityService = {
    generateJwt: TokenDto,
    getUser: user,
  };

  const mockAuthService = {
    signUp: jest.fn().mockImplementation((dto: UserSignInDto) => {
      const jwt = new JwtService();
      return {
        token: jwt.sign(
          {
            email: "test@gmail.com",
            password: "password",
            tag: "unique",
          },
          { secret: "wBfpyN%VTQ!OE%7fj?|EHBx4c" }
        ),
      };
    }),
    signIn: jest.fn().mockImplementation((dto: UserSignInDto) => {
      const jwt = new JwtService();
      return {
        token: jwt.sign(
          {
            email: "test@gmail.com",
            password: "password",
            tag: "unique",
          },
          { secret: "wBfpyN%VTQ!OE%7fj?|EHBx4c" }
        ),
      };
    }),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secretOrPrivateKey: "wBfpyN%VTQ!OE%7fj?|EHBx4c",
        }),
      ],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(UsersRepository),
          useValue: mockUserRepository,
        },
      ],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .overrideProvider(SecurityService)
      .useValue(mockSecurityService)
      .compile();

    authService = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(authService).toBeDefined();
  });

  describe("As a user I would like to", () => {
    it("sign up with email and password", async () => {
      mockUserRepository.getUserByEmail = jest
        .fn()
        .mockResolvedValue({
          id: "123123123",
          email: "test@gmail.com",
          password: "password",
          tag: "unique",
          created: new Date(),
          updated: new Date(),
        });

      const signUpToken = await authService.signUp({
        email: "test@gmail.com",
        password: "password",
        tag: "unique",
      });

      expect(signUpToken).toBeDefined();
      const jwt = new JwtService();
      const decodedToken = jwt.decode(signUpToken.token);
      expect(decodedToken).toMatchObject({
        email: "test@gmail.com",
        password: "password",
        tag: "unique",
      });
    });
  });

  it("get an error because such a user already exists", async () => {
    mockUserRepository.getUserByEmail = jest.fn().mockResolvedValue({
      id: 1,
      email: "test@gmail.com",
      password: "password",
      tag: "unique",
      created: new Date(),
      updated: new Date(),
    });
    try {
      await authService.signUp({
        email: "test@gmail.com",
        password: "password",
        tag: "unique",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  it("sign in", async () => {
    const signInUser = await authService.signIn({
      email: "test@gmail.com",
      password: "password",
    });
    expect(signInUser).toBeDefined();
    const jwt = new JwtService();
    const decodedToken = jwt.decode(signInUser.token);
    expect(decodedToken).toMatchObject({
      email: "test@gmail.com",
      password: "password",
    });
  });

  it("get an error if the password is wrong", async () => {
    const newUserSignInDto: UserSignInDto | any = {
      email: "test@gmail.com",
      password: "wrong password",
    };
    try {
      await authService.signIn(newUserSignInDto);
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
    }
  });
});
