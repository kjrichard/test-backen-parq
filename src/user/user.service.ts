import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { Repository } from 'typeorm';
import { CreateUserDto, EditUserDto } from './dtos';
import { User } from './entities/user.entity';
const NodeGeocoder = require('node-geocoder');

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
   
    ) {}

    async getMany(){
        const user = await this.userRepository.find({ status: true });
        return await Promise.all(
                user.map(async (us) =>  {
                const result = await this.checkCoordinates(us.address);
                us.latitude = result.coordenaties.latitude;
                us.longitude = result.coordenaties.lengt;
                us.geolocationStatus = result.status;
                return us;
            })
        );
    }

    async getOne(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ id, status: true })
        const result = await this.checkCoordinates(user.address);
        user.latitude = result.coordenaties.latitude;
        user.longitude = result.coordenaties.lengt;
        user.geolocationStatus = result.status;
        return user; 
    }

    async createOne( dto: CreateUserDto ){
        const userExist = await this.userRepository.findOne({ name: dto.name });
        if (userExist) throw new BadRequestException('El nombre esta en uso');
        const newUser = this.userRepository.create(dto);
        const user = await this.userRepository.save(newUser);
    }

    async deleteUser( id: number ): Promise<User> {
        const deleteUser = await this.getOne( id );
        deleteUser.status = false;
        const deleted = Object.assign(deleteUser);
        return await this.userRepository.save( deleted );
    }

    async updateUser(id: number, dto: EditUserDto ): Promise<User> {
        const user = await this.getOne( id );
        if(!user)  throw new NotFoundException( 'El usuario no existe' );
        const updateUser = Object.assign(user, dto);
        return await this.userRepository.save( updateUser );
    } 

    async getCoordinates( address: string ) {
        const options = {
          provider: 'google',
          apiKey: 'AIzaSyDmyCw1H_cMH62QKG2kD0S6BMMlMs4I-_A', // for Mapquest, OpenCage, Google Premier
          formatter: null // 'gpx', 'string', ...
        };
        const geocoder = NodeGeocoder(options);
        // Using callback
        const res = await geocoder.geocode( address );
        console.log(res);
        
        return res;

    }

    async checkCoordinates( address: string ) {
		try {
			const result = await this.getCoordinates( address );
			if( !result || result.length === 0 ) {
				return {
					status: 'A',
					coordenaties: {
						latitude: 0,
						lengt: 0
					}
				};
			}
			const res = result[0];
			return {
				status: 'A',
				coordenaties: {
				   latitude: res.latitude,
				   lengt: res.longitude
				}
			};
		} catch (e) {
			return {
				status: 'F',
				coordenaties: {
					latitude: 0,
					lengt: 0
				}
			};
		}
    }


    
}
