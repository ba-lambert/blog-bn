import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: true })
  isPublished: boolean;

  @ManyToOne(() => User, user => user.blogs)
  author: User;
}
