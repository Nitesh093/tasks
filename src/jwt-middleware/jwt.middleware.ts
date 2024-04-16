// jwt.middleware.ts

import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService,private configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    console.log("jwtMiddleware")
    const authHeader = req.headers['authorization'];
    if (!authHeader ) {
      throw new UnauthorizedException('Missing or invalid token');
    }
    const token = req.headers['authorization'];
    console.log("jwt token",token)
    
    
    try {
      const decoded = this.jwtService.verify(token);
      
      req['username'] = decoded.username;
      console.log(decoded.username)
      const username=this.configService.get<string>('USERNAME')
      if(decoded.username!=username){
        throw new UnauthorizedException(' invalid token');
      }
       // Attach the decoded user object to the request
       
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}