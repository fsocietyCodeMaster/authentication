import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { logger } from 'nestjs-i18n';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  // Logging Requests And Response.

  Logger = new Logger('HTTP')
  use(req: Request, res: Response, next: () => void) {

    const {ip,baseUrl,hostname,method} = req;
    const userAgent = req.get('user-agent') || '';
    const start = process.hrtime();
    res.on('finish',()=>{
      const {statusCode} = res;
      const contentLength = res.get('content-length')
      const dif = process.hrtime(start)
      const responseTime  = dif[0] * 1e3 +  dif[1] *  1e-6
      logger.log(`${method} ${baseUrl} ${userAgent} ${hostname} ${ip} - ${responseTime.toFixed(2)}ms ${statusCode} ${contentLength}`)
    })


    






    next();
  }
}
