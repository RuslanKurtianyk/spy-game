import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'locations'})
export class Location {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    name!: string;
}