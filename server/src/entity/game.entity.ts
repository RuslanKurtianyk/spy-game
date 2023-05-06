import { Player } from 'src/types/model/player';
import { GameStatus } from '../types';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'games' })
export class Game {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({
    type: 'varchar',
  })
  name!: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  players!: Player[];

  @Column({
    type: 'varchar',
    default: GameStatus.New,
  })
  status: GameStatus = GameStatus.New;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  admin?: string | null;
}
