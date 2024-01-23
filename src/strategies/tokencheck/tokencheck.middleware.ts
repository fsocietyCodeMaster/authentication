import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken'

// I added verify in interceptor it acts exactly like the middleware , middleware should use with id param paths unless we will have confilic with interceptor.

@Injectable()
export class TokencheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    
    
    const token = req.headers?.authorization?.split('Bearer ')[1]
    if(!token){throw new HttpException("Token is not provided.",400)}
    try{
      jwt.verify(token,process.env.JWT)
      
    }catch(error){
      throw new HttpException('Unauthorized action.',401)
    }
    
 


    next()
    }
    
  }

