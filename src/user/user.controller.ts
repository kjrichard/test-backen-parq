import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, EditUserDto } from './dtos';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {

    constructor(  private readonly userService: UserService ) {}

    @Get()
    async getMany( ) {
        const data = await this.userService.getMany();
        if( !data )  throw new NotFoundException( 'No hay registros' );
        return { data } 
    }

    @Get(':id')
    async getOne( @Param( 'id', ParseIntPipe ) id: number ) {
        const data = await this.userService.getOne( id );
        if(!data)  throw new NotFoundException( 'El usuario no existe' );
        return {  data }
    }

    @Post()
    async createOne( @Body() dto: CreateUserDto ) {
        const data = await this.userService.createOne(dto);
        return { data }
    }

    @Put( ':id' )
    async updateOne( @Param( 'id' ) id: number, @Body() dto: EditUserDto ) {
        let data = await this.userService.updateUser(id, dto);
        return { data }
    }

    @Put( 'delete/:id' )
    async deleteOne( @Param( 'id' ) id: number, @Body() status ) {
        let data = await this.userService.deleteUser(id);
        return { data }
    }

  /*   @Get( 'coordinates' )
    async assignCoordinates( @Param( 'id' ) id: number, @Body() status ) {
        let users = await this.userService.getMany();
        return { users }
    }
 */
    @Get('check')
    async getCoordinate( address ) {
       const coordinate = this.userService.checkCoordinates('cali')
    } 
}
