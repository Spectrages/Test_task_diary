import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) userRepository: Repository<UserEntity>
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner
    );
  }

  async getAllUsers(active: boolean) {
    return await this.find({
      where: {
        isActive: active,
      },
    });
  }
}
