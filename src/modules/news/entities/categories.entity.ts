import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import { NewsEntity } from './news.entity';

@Entity('categories')
export class CategoriesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, unique: true, length: 255 })
  title: string;

  @OneToMany(() => NewsEntity, (news) => news.category)
  news: NewsEntity[];

  @CreateDateColumn({ name: 'created' })
  created: Date;
}
