import { Router } from 'express';
import * as controllers from '../controllers/index';

export const index = Router();

index.get('/hello', controllers.hello);
// Games
index.get('/games', controllers.GameController.getList);
index.get('/games/:id', controllers.GameController.getOne);
index.post('/games', controllers.GameController.create);
index.put('/games/:id', controllers.GameController.update);
index.delete('/games/:id', controllers.GameController.delete);
