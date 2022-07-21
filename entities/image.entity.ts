/* eslint-disable import/prefer-default-export */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Image {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar")
  name: string;

  @Column("varchar")
  originalUrl: string;

  @Column("varchar")
  compressedUrl: string;

  @Column("varchar")
  size: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
