// ========================== nest ======================================
import { HttpStatus, Injectable } from "@nestjs/common";

// ========================== typeorm ===================================
import { InjectRepository } from "@nestjs/typeorm";
import { ObjectID, Repository } from "typeorm";

// ========================== entities & dto's ==========================
import { CreateSingleDeedDto } from "../dto's/deed-create.dto";
import { SingleDeedEntity } from "../entities/single-deed.entity";

@Injectable()
export class SingleDeedRepository extends Repository<SingleDeedEntity> {
  constructor(
    @InjectRepository(SingleDeedEntity)
    deedRepository: Repository<SingleDeedEntity>
  ) {
    super(
      deedRepository.target,
      deedRepository.manager,
      deedRepository.queryRunner
    );
  }

  async createDeed(
    deed: CreateSingleDeedDto
  ): Promise<SingleDeedEntity> {
    const newDeed = await this.create({
      created: new Date(),
      updated: new Date(),
      name: deed.name,
      description: deed.description,
    });

    return await this.save(newDeed);
  }

  async deleteById(deedId: ObjectID): Promise<HttpStatus> {
    await this.delete(deedId);
    return HttpStatus.OK;
  }

  async getDeedById(deedId): Promise<SingleDeedEntity> {
    const _id = deedId;
    return await this.findOneOrFail(_id);
  }

  async updateDeed(
    deed: SingleDeedEntity
  ): Promise<SingleDeedEntity> {
    return await this.save(deed);
  }

  async getAllDeed(): Promise<SingleDeedEntity[]> {
    return await this.find();
  }
}
