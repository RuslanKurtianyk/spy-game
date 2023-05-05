import { DataSource } from 'typeorm';
import { Game } from './entity/game.entity';
require('dotenv').config();

export const myDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Game],
    migrations: ['src/migrations/*.{ts,js}'],
    logging: true,
    synchronize: true,
});
