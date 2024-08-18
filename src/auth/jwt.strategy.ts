import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt-payload.interface';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your_secret_key', // Use a secure secret in production
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findOne(payload.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
