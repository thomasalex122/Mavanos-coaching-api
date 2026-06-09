import { Injectable,ConflictException , NotFoundException } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SessionsService {
  
  constructor(private prisma: PrismaService) {}

  async create(createSessionDto : CreateSessionDto , coachId : number) {
    return this.prisma.session.create({
      data: {
        title: createSessionDto.title,
        date: new Date(createSessionDto.date),
        maxSlots: createSessionDto.maxSlots,
        coachId : coachId,
      },
    });
  }
  // We will build the rest of these later!
  findAll()
  {
    return this.prisma.session.findMany({
      include:{
        coach: {
          select:{
            name: true,
            email: true,

          }
      }
      }
    })
  }

  // the Booking Function for Users to book a session
  async bookSession(sessionId: number , studentId : number )
  {
    try{
    const ticket = await this.prisma.booking.create(
      {
        data: {
          sessionId:  sessionId,
          userId: studentId,
        },
      }
    );
    return{message : "Session booked Successfully ! " , ticket}
  }
  catch(error: any){
    // Prisma throws a specific error code ("P2002") when a unique constraint fails, which in this case would indicate that the user has already booked the session.
    if (error.code === 'P2002') {
      throw new ConflictException('You have already booked this session.');
    }
    throw error;
  }
}

  async getStudentSchedule(studentId: number) {
    return this.prisma.booking.findMany({
      where: { userId: studentId },
      // Deep Include: Grab the ticket -> grab the class -> grab the coach's name!
      include: {
        session: {
          include: {
            coach: {
              select: { name: true, email: true }
            }
          }
        }
      }
    });
  }


  async getCoachClasses(coachId: number) {
    return this.prisma.session.findMany({
      where: { coachId: coachId },
      // Deep Include: Grab the class -> grab all the tickets -> grab the students' names!
      include: {
        bookings: {
          include: {
            user: {
              select: { name: true, email: true }
            }
          }
        }
      }
    });
  }
  
}
