import { Controller, Get, Body, Patch, Param, Delete,ParseIntPipe,HttpException,Res, Post,Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { TokenType, User } from 'src/strategies/param/cutom.param';
import {Response} from 'express'
import { I18n, I18nContext } from 'nestjs-i18n';
import { ApiTags } from '@nestjs/swagger';
import { ResetPassDto } from './dto/reset.pass.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Finding All Users.

  @Get('/find-all')
  findAll() {
    return this.userService.findAll();
  }


  // Finding a User By Id.

  @Get('/find/:id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }


  //  Updating User : Firstname,Lastname,Phone.

  @Put('/update-user/:id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto,@I18n() i18n:I18nContext,) {
    const message = i18n.t('translation.UpdateUser')
    return this.userService.update(id, updateUserDto,message);
  }

  // Reseting a User Password.

  @Put('/reset-password/:id')
  resetPassword(@Body() resetPassDto:ResetPassDto,@Param('id',ParseIntPipe) id:number,@User() user:TokenType,@Res() res:Response,@I18n() i18n:I18nContext){
    if(id !== user.id){throw new HttpException(`You don't have permission.`,401)}
    console.log(id,user.id)
    const message = i18n.t('translation.ResetPass')
    return this.userService.resetpass(resetPassDto,id,res,message)
  }



  // Deleting a User By Id.

  @Delete('/delete-user/:id')
  remove(@Param('id',ParseIntPipe) id: number,@User() user:TokenType,@Res() res:Response,@I18n() i18n:I18nContext) {
    const message = i18n.t('translation.DeleteUser')
    if(id !== user.id){throw new HttpException(`You don't have permission.`,401)}
    return this.userService.remove(id,res,message);
  }
}
