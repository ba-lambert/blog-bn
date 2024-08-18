import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Blog } from 'src/blog/entities/blog.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  isAdmin: boolean;

  @OneToMany(() => Blog, blog => blog.author)
  blogs: Blog[];
}
