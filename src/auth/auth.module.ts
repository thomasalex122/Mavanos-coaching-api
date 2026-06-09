import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      // We read the secret directly from your .env file
      secret: process.env.JWT_SECRET, 
      signOptions: { 
        // This is the global expiration policy for your digital wristbands
        expiresIn: '7d', 
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
