import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    name!: string;

    @Column({
        type: 'json',
        nullable: true,
    })
    players!: Record<string, any>[];
}