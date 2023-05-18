import { DataSource } from 'typeorm';
import { Game } from './entity/game.entity';
import { Location } from './entity/location.entity';
require('dotenv').config();

export const appDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Game, Location],
    migrations: ['src/migrations/*.{ts}'],
    logging: true,
    synchronize: false,
});
