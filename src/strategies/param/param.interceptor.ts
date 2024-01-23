import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'


// Creating Custome Interceptor.


@Injectable()
export class ParamInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {

  const request = context.switchToHttp().getRequest()
  const token = request?.headers?.authorization?.split('Bearer ')[1]
  const user =  jwt.decode(token)
  request.user = user
  
    return next.handle();
  }
}
