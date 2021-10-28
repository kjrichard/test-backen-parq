
import { IsNotEmpty, IsNumberString, IsString, Length } from "class-validator";
import { Column, CreateDateColumn, Entity,  PrimaryGeneratedColumn } from "typeorm";



@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 15 })
    name : string;

    @Column({ type: "varchar", length: 15 })
    lastName: string;

    @Column({ type: "varchar", length: 15 })
    address: string;

    @Column({ type: "varchar", length: 15 })
    city: string;

    @Column({ default: 0 })
    longitude: string;

    @Column({ default: 0 })
    latitude: string;

    @Column({ default: 'F'})
    geolocationStatus: string;

    @Column({ type: 'bool', default: true })
    status: boolean;

   
    
}