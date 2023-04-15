// ========================== nest ======================================
import { Injectable } from "@nestjs/common";

// ========================== typeorm ===================================
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

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

  async getUserById(userId: string): Promise<UsersEntity> {
    const res = await this.findOneBy({
      _id: userId,
    });
    console.log(res);
    return res;
  }

  async getUserByTag(userTag: string): Promise<UsersEntity> {
    return await this.findOneBy({ tag: userTag });
  }

  async getUserByEmail(email: string): Promise<UsersEntity> {
    return await this.findOneBy({ email: email });
  }

  async updateUser(newData: UserSessionDto): Promise<UsersEntity> {
    return await this.save(newData);
  }
}
