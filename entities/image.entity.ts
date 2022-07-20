import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VehiclePart {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  originalLink: string;

  @Column('varchar', { length: 255, nullable: true })
  category: string;

  @Column('decimal', { nullable: false, default: 0 })
  price: number;

  @Index()
  @Column('int', { nullable: true })
  year: number;

  @Column('int', { nullable: true })
  partsCategoryId: number;

  @Index()
  @ManyToOne(() => VehicleMake, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  make: VehicleMake;

  @Index()
  @ManyToOne(() => VehicleModel, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  model: VehicleModel;

  @Index()
  @ManyToOne(() => VehiclePartsCategory, {
    onDelete: 'SET NULL',
    nullable: true,
    eager: true,
  })
  partsCategory: VehiclePartsCategory;

  @Column({
    nullable: true,
  })
  side: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
