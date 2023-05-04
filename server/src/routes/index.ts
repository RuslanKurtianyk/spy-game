import { Router } from 'express';
import * as controllers from '../controllers/index';

export const routes = Router();

routes.get('/hello', controllers.hello);
// Games
routes.get('/games', controllers.GameController.getList);
routes.get('/games/:id', controllers.GameController.getOne);
routes.post('/games', controllers.GameController.create);
routes.put('/games/:id', controllers.GameController.update);
routes.delete('/games/:id', controllers.GameController.delete);
