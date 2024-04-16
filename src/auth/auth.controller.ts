// src/auth/auth.controller.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string): Promise<{ accessToken: string }> {
    // Validate credentials
    const isValid = await this.authService.validateCredentials(username, password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const accessToken = await this.authService.generateJwtToken(username);
    return { accessToken };
  }
}
