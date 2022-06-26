import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import { CategoriesEntity } from './categories.entity';

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, length: 255 })
  image: string;

  @Column({ nullable: true, length: 255 })
  title: string;

  @Column({ nullable: true })
  shortDescription: string;

  @Column({ nullable: true })
  fullDescription: string;

  @Column({ nullable: true })
  likesQuantity: number;

  @Column({ nullable: true })
  date: Date;

  @ManyToOne(() => CategoriesEntity, (category) => category.news)
  category: CategoriesEntity;

  @CreateDateColumn({ name: 'created' })
  created: Date;
}
