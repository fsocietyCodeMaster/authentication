import {createParamDecorator,ExecutionContext} from '@nestjs/common'

// Creating Custome Parameter.

export interface TokenType {name: string,id: number,iat: number,exp: number}

export const User = createParamDecorator((data,context:ExecutionContext)=>{
    const request = context.switchToHttp().getRequest()
    return request.user
    
})