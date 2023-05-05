import { Request, Response } from 'express';
import { getLocationsList, getRandomLocation } from '../services/location.service';

export const LocationController = {
  getList: async (request: Request, response: Response): Promise<void> => {
    response.send(await getLocationsList());
  },
  getRandomOne: async (request: Request, response: Response): Promise<void> => {
    const randomLocation = await getRandomLocation();
    const status = randomLocation ? 200 : 404;
    const result = randomLocation ? randomLocation : 'Location not found';
    response.status(status).send(result);
  },
};
