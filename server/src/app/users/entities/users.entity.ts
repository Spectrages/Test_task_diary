// ========================== typeorm ===================================
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
  } from "typeorm";
  
  // ========================== entities ==================================
  import { UUIDEntity } from "../../../shared/entities/uuid.entity";
  
  // ========================== swagger ====================================
  import { ApiProperty } from "@nestjs/swagger";