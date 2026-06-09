import { Controller, Post, Body, UseGuards, Request, ForbiddenException, Get , Param , ParseIntPipe } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createSessionDto: CreateSessionDto, @Request() req) {
    
    if (req.user.role !== 'COACH') {
      throw new ForbiddenException('Only Coaches can create a session!');
    }

    const verifiedCoachId = req.user.userId ;

    if (!verifiedCoachId) {
      throw new ForbiddenException('Could not identify coach from token.');
    }

    return this.sessionsService.create(createSessionDto, verifiedCoachId);
  }

  @Get()
  findAll()
  {
    return this.sessionsService.findAll();
  }


  // for users to book a session

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/book')

  // it takes the id from rquest param then converts into int and that is saved into sessionID : number ( prisma takes only Number not int or float)
  book(@Param('id' , ParseIntPipe) sessionId : number , @Request() req){
    if (req.user.role !== 'STUDENT'){
      throw new ForbiddenException('Only Students can book a session!');
    }

    const verifiedStudentId = req.user.userId ;

    if (!verifiedStudentId) {
      throw new ForbiddenException('Could not identify student from token.');
    }



    // we are sending only id of session and student id not sending the book word
    return this.sessionsService.bookSession(sessionId , verifiedStudentId);
  }


  // the Student Schedule Route to get all the sessions that a student has booked

  @UseGuards(AuthGuard('jwt'))
  @Get('my-schedule')
  getSchedule(@Request() req) 
  {
    if (req.user.role !== 'STUDENT'){
      throw new ForbiddenException('Only Students can view their schedule!');
    }

    const studentId = req.user.userId ;

    if (!studentId) {
      throw new ForbiddenException('Could not identify student from token.');
    }

    return this.sessionsService.getStudentSchedule(studentId);

  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my-classes')
  getClasses(@Request() req)
  {
    if (req.user.role !== 'COACH'){
      throw new ForbiddenException('Only Coaches can view their classes!');
    }

    const coachId = req.user.userId ;

    if (!coachId) {
      throw new ForbiddenException('Could not identify coach from token.');
    }

    return this.sessionsService.getCoachClasses(coachId);

    
  }

}