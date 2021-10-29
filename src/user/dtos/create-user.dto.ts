import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { CreateDateColumn } from "typeorm";

export class CreateUserDto {
    @ApiProperty({
		required: false,
		description: 'Nombre del usuario',
	})
    @IsNotEmpty()
    @Length(4, 15)
    @IsString()
    name : string;

    @ApiProperty({
		required: false,
		description: 'Apellido del usuario',
	})
    @IsNotEmpty()
    @Length(4, 15)
    @IsString()
    lastName : string;

    @ApiProperty({
		required: false,
		description: 'Direccion del usuario',
	})
    @IsNotEmpty()
    @Length(4, 15)
    @IsString()
    address : string;

    @ApiProperty({
		required: false,
		description: 'Ciudad del usuario',
	})
    @IsNotEmpty()
    @Length(4, 15)
    @IsString()
    city : string;

    @ApiProperty({
		required: false,
		description: 'Longitud',
	})
    longitude : string;

    @ApiProperty({
		required: false,
		description: 'Lactitud',
	})
    latitude : string;
    
}