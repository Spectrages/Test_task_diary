// ========================== nest ======================================
import { HttpStatus, Injectable } from "@nestjs/common";

// ========================== typeorm ===================================
import { InjectRepository } from "@nestjs/typeorm";
import { ObjectID, Repository } from "typeorm";

// ========================== entities & dto's ==========================
import { UsersEntity } from "../entities/users.entity";
import { UserCreateDto } from "../dto's/user-create.dto";
import { UserSessionDto } from "../dto's/user-session.dto";

@Injectable()
export class UsersRepository extends Repository<UsersEntity> {
  constructor(
    @InjectRepository(UsersEntity)
    usersRepository: Repository<UsersEntity>
  ) {
    super(
      usersRepository.target,
      usersRepository.manager,
      usersRepository.queryRunner
    );
  }

  async getUserById(userId): Promise<UsersEntity> {
    const _id = userId;
    return await this.findOneByOrFail(_id);
  }

  async createUser(createUser: UserCreateDto): Promise<UsersEntity> {
    const newUser = await this.create({
      created: new Date(),
      updated: new Date(),
      email: createUser.email,
      password: createUser.password,
      rating: createUser.rating,
      tag: createUser.tag,
      deeds: createUser.deeds,
      friends: createUser.friends,
    });
    return await this.save(newUser);
  }

  async getUserByTag(userTag: string): Promise<UsersEntity> {
    return await this.findOneBy({ tag: userTag });
  }

  async getUserByEmail(email: string): Promise<UsersEntity> {
    return await this.findOneBy({ email: email });
  }

  async updateUser(newData: UsersEntity): Promise<UsersEntity> {
    return await this.save(newData);
  }

  async deleteUser(user: UserSessionDto): Promise<HttpStatus> {
    await this.delete(user._id);
    return HttpStatus.OK;
  }
}
