import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { Blog } from './blog/entities/blog.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'weatherApp',
      autoLoadEntities: true,
      entities:[User,Blog],
      synchronize: false, // Set to false in production
    }),
    AuthModule,
    BlogModule,
    UserModule
  ],
})
export class AppModule {}
