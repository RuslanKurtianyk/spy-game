import { Router } from 'express';
import * as controllers from '../controllers';

export const routes = Router();

routes.get('/api/hello', controllers.hello);
// Games
routes.get('/api/games/:id', controllers.GameController.getOne);
routes.post('/api/games', controllers.GameController.create);
routes.put('/api/games/:gameId/join', controllers.GameController.join);
routes.put('/api/games/:gameId/start', controllers.GameController.start);

// Locations
routes.get('/api/locations', controllers.LocationController.getList);
routes.get('/api/locations/random', controllers.LocationController.getRandomOne);