import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.userService.findByUsername(username);
    
    // Validate user credentials here
    if (user && user.password === pass) { // In real scenarios, use a hashing function to compare passwords
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload: JwtPayload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, username: user.username },
    };
  }

  async register(username: string, password: string): Promise<User> {
    const existingUser = await this.userService.findByUsername(username);

    if (existingUser) {
      throw new UnauthorizedException('Username is already taken');
    }

    return this.userService.create(username, password);
  }
}
