import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";




export class ResetPassDto{

@ApiProperty({
    description:'Old password.'
})
@IsNotEmpty()
@IsString()
oldPassword:string;

@ApiProperty({
    description:'New password.'
})
@Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/,{message:'password should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.'})
@MinLength(8)
password:string;

}