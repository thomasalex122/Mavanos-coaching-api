import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async createBooking(sessionId: number, studentId: number) {
    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
      include: { bookings: true }
    });

    if (!session) throw new BadRequestException('Class not found.');

    const alreadyBooked = session.bookings.find(b => b.userId === studentId);
    if (alreadyBooked) throw new BadRequestException('You have already booked this class.');

    if (session.bookings.length >= session.maxSlots) {
      throw new BadRequestException('This class is completely full.');
    }

    return this.prisma.booking.create({
      data: {
        userId: studentId,
        sessionId: sessionId,
      }
    });
  }

  async getStudentSchedule(studentId: number) {
    return this.prisma.booking.findMany({
      where: { userId: studentId },
      include: {
        session: {
          include: { coach: { select: { email: true, name: true } } }
        }
      }
    });
  }

  async cancelBooking(sessionId: number, studentId: number) {
    return this.prisma.booking.deleteMany({
      where: { 
        sessionId: sessionId, 
        userId: studentId 
      }
    });
  }
}