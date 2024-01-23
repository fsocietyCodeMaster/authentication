import { ApiProperty } from '@nestjs/swagger'
import { IsStrongPassword,Matches,IsEmail, IsNumber, IsOptional, IsNotEmpty, IsString} from 'class-validator'

export class LoginAuthDTo{

@ApiProperty({ description:'a user login either phone or email.'})
@IsNotEmpty()
@IsString()
username:string

@ApiProperty()
@IsStrongPassword({minLength:8})
@Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/,{message:'password should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character'})
password:string

}
