import {Controller , Post , Body, Get, UseGuards , Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthGuard} from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('role') role: 'STUDENT' | 'COACH',
    ){
        return this.authService.register(name , email , password , role);
    }

    @Post('login')
    async login(
        @Body('email') email:string,
        @Body('password') password:string,

    ){
        return this.authService.login(email, password); 
        
    }


    //AuthGuard('jwt') is the Bouncer that checks the wristband on every request to this route

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
        return {
            message: 'This is a protected route. Your wristband is valid!',
            user: req.user, // This will contain the decoded JWT payload
        }
    }

}