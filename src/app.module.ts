import { Module,NestModule, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { I18nModule,AcceptLanguageResolver } from 'nestjs-i18n';
import * as path from 'path';
import { NestMiddlewareConsumer } from 'nestjs-i18n/dist/types';
import { LoggerMiddleware } from './strategies/logger/logger.middleware';
import { TokencheckMiddleware } from './strategies/tokencheck/tokencheck.middleware';
@Module({
  imports: [
     I18nModule.forRoot({
      fallbackLanguage:'en',
      loaderOptions:{
        path:path.join(__dirname,'/i18n/'),
        watch:true
      },
      resolvers:[
       new AcceptLanguageResolver()
      ]
     })     
    ,AuthModule, UserModule, PrismaModule],

})
export class AppModule implements NestModule {
  configure(consumer:NestMiddlewareConsumer){
    consumer.apply(LoggerMiddleware).forRoutes('*')
    consumer.apply(TokencheckMiddleware).forRoutes({path:'user/delete-user/:id',method:RequestMethod.DELETE})
    consumer.apply(TokencheckMiddleware).forRoutes({path:'user/reset-password/:id',method:RequestMethod.PUT})
    consumer.apply(TokencheckMiddleware).forRoutes({path:'user/update-user/:id',method:RequestMethod.PUT})
    consumer.apply(TokencheckMiddleware).forRoutes({path:'user/upload-photo',method:RequestMethod.POST})

  }
}
