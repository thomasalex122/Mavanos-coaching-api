import { Controller, Post, Get, Delete, Param, UseGuards, Request, ForbiddenException, ParseIntPipe } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':sessionId')
  book(@Param('sessionId', ParseIntPipe) sessionId: number, @Request() req) {
    if (req.user.role !== 'STUDENT') throw new ForbiddenException('Only Students can book classes!');
    return this.bookingsService.createBooking(sessionId, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my-schedule')
  getSchedule(@Request() req) {
    if (req.user.role !== 'STUDENT') throw new ForbiddenException('Only Students can view their schedule!');
    return this.bookingsService.getStudentSchedule(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':sessionId/cancel')
  cancelBooking(@Param('sessionId', ParseIntPipe) sessionId: number, @Request() req) {
    if (req.user.role !== 'STUDENT') throw new ForbiddenException('Only Students can cancel bookings!');
    return this.bookingsService.cancelBooking(sessionId, req.user.userId);
  }
}