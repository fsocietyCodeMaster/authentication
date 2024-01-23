import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsEmail, IsLowercase, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator'


export class RegisterAuthDto {

@ApiProperty({
    example:'Amir'
})    
@IsLowercase()    
@IsString()
@IsNotEmpty()    
firstname:string

@ApiProperty({
    example:'Rostami'
})
@IsLowercase()
@IsString()
@IsNotEmpty()    
lastname:string

@ApiProperty({
    example:'Amirrostami@ymail.com'
})
@IsEmail()
email:string

@ApiProperty({
    description:'Phone has regular expression.',
    example:'+98 918 312 6655'
})
@Matches(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,{message:'Phone example:+86 800 555 1234'})
phone:string

@ApiProperty({
    description:'Password has regular expression.',
    example:'Amirrostami@1'
})
@MinLength(8)
@Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/,{message:'password should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.'})
password:string

@ApiProperty()
@IsBoolean()
@IsOptional()
isAdmin:boolean

}
