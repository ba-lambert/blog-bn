import { Controller, Post, Body, Request, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: { username: string, password: string }): Promise<User> {
    return this.authService.register(registerDto.username, registerDto.password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    // The req.user is populated by the LocalAuthGuard
    if (!req.user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user; // req.user is populated by JwtAuthGuard
  }
}
