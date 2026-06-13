
// (Module) tells nest js , hey nest this is a module 
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// importing the rest of the modules here
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { SessionsModule } from './sessions/sessions.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [AuthModule, PrismaModule, SessionsModule, BookingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// here class is not empty the decorator @module is attacting info to it
