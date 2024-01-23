import { HttpException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs'
import {Response} from 'express'
import { ResetPassDto } from './dto/reset.pass.dto';
import { TokenType } from 'src/strategies/param/cutom.param';
import {JWT} from 'src/strategies/jwt/jwb'


@Injectable()
export class UserService {
  constructor(private readonly prismaService:PrismaService) {}

  // Creating a User.

async  create({firstname,lastname,email,password,phone,isAdmin}: RegisterAuthDto,message:string) {
  try{
  const userExists = await this.prismaService.user.findUnique({
    where:{
      email
    }
  })
  if(userExists){throw new HttpException('User already exists.',409)};

  const securePass = await bcrypt.hash(password,8);
    const user = await this.prismaService.user.create({
      select:{
        id:false,password:false,createdAt:false,firstname:true,lastname:true,email:true,phone:true
      },
      data:{
        firstname,lastname,email,password:securePass,isAdmin,phone
      }
    })

    return (message);
    }catch(error){
      return error;
    }
  }

  // Finding All Users.

async  findAll() {
    const userExists = await this.prismaService.user.findMany({
      select:{
        id:true,firstname:true,lastname:true,email:true,phone:true,createdAt:false,password:false
      }
    })
    if(!userExists){throw new HttpException('No users found.',404)};
    return userExists;
  }


  // Finding a User By Id.

async  findOne(id: number) {
    const userExists = await this.prismaService.user.findUnique({
      select:{
        id:true,firstname:true,lastname:true,email:true,phone:true,createdAt:false,password:false
      },
      where:{
        id
      }
    })
    if(!userExists){throw new HttpException('User not found.',404)};
    return userExists;
  }


  // User Update : Firstname,Lastname,Phone.


async  update(id: number, updateUserDto: UpdateUserDto,message:string) {
    const userExists = await this.prismaService.user.findUnique({
      where:{
        id
      }
    })
    if(!userExists){throw new HttpException('User not found.',404)}
    
    if(!updateUserDto || Object.keys(updateUserDto).length == 0){throw new HttpException(`You can't send empty data,at least one parameter is necessary.`,400)}
    const userUpdate = await this.prismaService.user.update({
      where:{
        id
      },
      data:updateUserDto
    })

    return message
  }


  // User Reset The Password , Three Important Data: Old password,New password.

async resetpass(resetPassDto:ResetPassDto,id:number,res:Response,message:string){
  const userExists = await this.prismaService.user.findUnique({
    where:{
      id
    }
  })
  if(!userExists){throw new HttpException('User not found.',404)};

  const oldPassCheck = await bcrypt.compare(resetPassDto.oldPassword,userExists.password);
  if(!oldPassCheck){throw new HttpException('Invalid Credentials',401)};
  
    const hashpass = await bcrypt.hash(resetPassDto.password,8);
    const newPass = await this.prismaService.user.update({
      where:{
        id
      },
      data:{
        password:hashpass
      }
    })
    res.send(message);
  }


  
  // Deleting a User By Id.

async  remove(id: number,res:Response,message:string) {
    const userExists = await this.prismaService.user.findUnique({
      where:{
        id
      }
    })
    if(!userExists){throw new HttpException('User not found.',404)}
    const userDelete = await this.prismaService.user.delete({
      where:{
        id
      }
    })
    res.send(message) ;
  
  }

 
}

