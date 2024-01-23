import * as jwt from 'jsonwebtoken'

// Generating JasonWebToken.

export const JWT =  (id:number,name:string)=>{

    const token =  jwt.sign({id,name},process.env.JWT,{expiresIn:'48h'})
    return token

}