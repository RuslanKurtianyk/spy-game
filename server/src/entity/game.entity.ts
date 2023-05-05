import { GameStatus } from '../types';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'games'})
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

    @Column({
        type: 'varchar',
        default: GameStatus.New,
    })
    status: GameStatus = GameStatus.New;
}