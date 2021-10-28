import { IsString } from "class-validator";
import { CreateDateColumn } from "typeorm";

export class EditUserDto {
  
    @IsString()
    name : string;

    @IsString()
    lastName : string;

    @IsString()
    address : string;

    @IsString()
    city : string;

    
}