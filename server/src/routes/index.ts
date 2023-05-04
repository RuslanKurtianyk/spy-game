import { Router } from 'express';
import * as controllers from '../controllers/index';

export const routes = Router();

routes.get('/api/hello', controllers.hello);
// Games
routes.get('/api/games', controllers.GameController.getList);
routes.get('/api/games/:id', controllers.GameController.getOne);
routes.post('/api/games', controllers.GameController.create);
routes.put('/api/games/:id', controllers.GameController.update);
routes.delete('/api/games/:id', controllers.GameController.delete);
