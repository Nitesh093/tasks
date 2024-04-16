// src/app.module.ts
import { Module ,NestModule,MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './tasks/task.module';
import { TeamModule } from './teams/team.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './jwt-middleware/jwt.middleware'; // Import JwtMiddleware

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017/nest-task-manager',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    JwtModule.registerAsync({ // Register JwtModule asynchronously
      imports: [ConfigModule], // Import ConfigModule to use ConfigService
      useFactory: async (configService: ConfigService) => ({
        secret: '1234', // Retrieve JWT secret from environment variable
        signOptions: { expiresIn: '1h' }, // Set token expiration time
      }),
      inject: [ConfigService],
    }),
    TaskModule,
    TeamModule,
    AuthModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware).exclude('/auth/login') // Apply JwtMiddleware to all routes
      .forRoutes('*') // Apply to all routes

    // You can exclude routes if needed
    
    
  }
}


