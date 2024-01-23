import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service'
import { UserService } from 'src/user/user.service';
import {APP_INTERCEPTOR} from '@nestjs/core'
import { ParamInterceptor } from 'src/strategies/param/param.interceptor';

@Module({
  controllers: [AuthController],
  providers: [AuthService,PrismaService,UserService,{provide:APP_INTERCEPTOR,useClass:ParamInterceptor}],
})
export class AuthModule {}
