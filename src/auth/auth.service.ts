import { Injectable, UnauthorizedException, ConflictException} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {
    // depency injection of prisma service
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) {}

    async register(name: string , email: string , pass: string , role: 'STUDENT' | 'COACH') {
        const existingUser = await this.prisma.user.findUnique({
            where: { email }
        });

        if (existingUser)
        {
            throw new ConflictException('Email aldready in use') ;

        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(pass , saltRounds);

        const newUser = await this.prisma.user.create({
            data:{
                name,
                email,
                password: hashedPassword,
                role,
            },

        });

        const { password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;





        

    }

    async login(email: string , pass: string)
    {
        // checking the user exist or not
        const user = await this.prisma.user.findUnique({
            where: { email }
        });
        if(!user)
        {
            throw new UnauthorizedException('Invalid credentials');
        }

        // comparing the password
        const isPasswordValid = await bcrypt.compare(pass , user.password);
        if(!isPasswordValid)
        {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role

        };

        return {
            access_token: this.jwtService.sign(payload),

                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },

        };


    }
}



    

