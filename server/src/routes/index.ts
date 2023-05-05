import { Router } from 'express';
import * as controllers from '../controllers';

export const routes = Router();

routes.get('/api/hello', controllers.hello);
// Games
routes.get('/api/games', controllers.GameController.getList);
routes.get('/api/games/:id', controllers.GameController.getOne);
routes.post('/api/games', controllers.GameController.create);
routes.put('/api/games/:id', controllers.GameController.update);
routes.delete('/api/games/:id', controllers.GameController.delete);

// Locations
routes.get('/api/locations', controllers.LocationController.getList);
routes.get('/api/locations/random', controllers.LocationController.getRandomOne);