import { Request, Response } from 'express';
import { getLocationsList } from '../services/location.service';

export const LocationController = {
  getList: async (request: Request, response: Response): Promise<void> => {
    response.send(await getLocationsList());
  },
};
