import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { CreateDateColumn } from "typeorm";

export class CreateUserDto {
    @ApiProperty({
		required: false,
		description: 'The negotiation identifier',
	})
    @IsNotEmpty()
    @Length(4, 15)
    @IsString()
    name : string;

    @ApiProperty({
		required: false,
		description: 'The negotiation identifier',
	})
    @IsNotEmpty()
    @Length(4, 15)
    @IsString()
    lastName : string;

    @ApiProperty({
		required: false,
		description: 'The negotiation identifier',
	})
    @IsNotEmpty()
    @Length(4, 15)
    @IsString()
    address : string;

    @ApiProperty({
		required: false,
		description: 'The negotiation identifier',
	})
    @IsNotEmpty()
    @Length(4, 15)
    @IsString()
    city : string;

    @ApiProperty({
		required: false,
		description: 'The negotiation identifier',
	})
    length : string;

    @ApiProperty({
		required: false,
		description: 'The negotiation identifier',
	})
    latitude : string;
    
}