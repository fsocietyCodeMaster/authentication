import { Injectable,HttpException } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDTo } from './dto/login-auth.dto';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs'
import { JWT } from 'src/strategies/jwt/jwb'
import {Response} from 'express'
@Injectable()
export class AuthService {
  constructor(private readonly userService:UserService,private readonly prismaService:PrismaService) {}

  // Registration Process.

async  register(createAuthDto: RegisterAuthDto,message:string) {
   return await this.userService.create(createAuthDto,message);
  }


  // Log in Process.

async  login({username,password}:LoginAuthDTo) {
 
  const userExists = await this.prismaService.user.findFirst({
      where:{
        OR:[{email:username},{phone:username}]
      }
    })
    if(!userExists){throw new HttpException('Invalid Credentials.',401)};

    const chekingPass = await bcrypt.compare(password,userExists.password)

    if(!chekingPass){throw new HttpException('Invalid Credentials.',401)};
        return  JWT(userExists.id,userExists.firstname);
}

}
