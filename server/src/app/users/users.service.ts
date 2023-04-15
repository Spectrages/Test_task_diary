// ============================ nest ====================================
import { Injectable } from "@nestjs/common";

// ========================== repositories ==============================
import { UsersRepository } from "./repos/users.repository";

// ========================== entities ==================================
import { UsersEntity } from "./entities/users.entity";

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async getUserByTag(userTag: string): Promise<UsersEntity> {
    return await this.userRepository.getUserByTag(userTag);
  }
}