// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import 'dotenv/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // This is the Rulebook for the Bouncer
    super({
      // 1. Tell him exactly where to look for the wristband (The Authorization Header)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      
      // 2. Do not let expired wristbands in
      ignoreExpiration: false,
      
      // 3. Hand him the UV Light (Your Secret Key) to check the signature
      secretOrKey: process.env.JWT_SECRET as string,
    });
  }

  // If the signature is perfect and not expired, this function runs.
  // Whatever we return here is officially attached to the request as the "Logged In User"
  async validate(payload: any) {
    return { 
      userId: payload.sub, 
      email: payload.email, 
      role: payload.role 
    };
  }
}