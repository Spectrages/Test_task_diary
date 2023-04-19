// ========================== nest ======================================
import { HttpStatus, Injectable } from "@nestjs/common";

// ========================== typeorm ===================================
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ObjectId } from "mongodb";

// ========================== entities & dto's ==========================
import { UsersEntity } from "../entities/users.entity";
import { UserCreateDto } from "../dto's/user-create.dto";

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

  async getAll(): Promise<UsersEntity[]> {
    return await this.find();
  }

  async getUserById(userId: string): Promise<UsersEntity> {

    const _id = new ObjectId(userId);
    return await this.findOneOrFail({ where: { _id } });
  }

  async createUser(createUser: UserCreateDto): Promise<UsersEntity> {
    const newUser = await this.create({
      created: new Date(),
      updated: new Date(),
      email: createUser.email,
      password: createUser.password,
      firstname: createUser.firstname,
      middlename: createUser.middlename,
      lastname: createUser.lastname,
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

  async deleteUser(userId: string): Promise<HttpStatus> {
    await this.delete(userId);
    return HttpStatus.OK;
  }

  async getUsersArrayByEmail(email: string): Promise<UsersEntity[]> {
    return await this.find({ where: { email: email } });
  }

  async getUsersArrayByTag(tag: string): Promise<UsersEntity[]> {
    return await this.find({ where: { tag: tag } });
  }
}
