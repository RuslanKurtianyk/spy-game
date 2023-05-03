import { Router } from 'express';
import * as controllers from '../controllers/index';

export const index = Router();

index.get('/hello', controllers.hello);
// Games
index.get('/games', controllers.getGameList);
index.get('/games/:id', controllers.getOneGame);
index.post('/games', controllers.createGame);
