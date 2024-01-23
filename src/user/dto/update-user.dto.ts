import { ApiProperty } from "@nestjs/swagger";
import { IsLowercase, IsOptional, Matches, MinLength } from "class-validator";



export class UpdateUserDto  {

@ApiProperty()
@IsOptional()
@IsLowercase()    
firstname:string;

@ApiProperty()
@IsOptional()
@IsLowercase()
lastname:string;

@ApiProperty()
@IsOptional()
@Matches(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,{message:'Phone example:+86 800 555 1234'})
phone:string;


}
