// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateJwtToken(username: string): Promise<string> {
    const payload = { username };
    return this.jwtService.sign(payload);
  }

  async validateCredentials(username: string, password: string): Promise<boolean> {
    // Retrieve username and password from environment variables
    const validUsername = this.configService.get<string>('USERNAME');
    const validPassword = this.configService.get<string>('PASSWORD');
    console.log(username , password,validUsername,"to",validPassword)
    // Check if the credentials are valid
    return username === validUsername && password === validPassword;
  }
}
