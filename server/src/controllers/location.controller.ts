import { Request } from 'express';
import { getLocationsList } from '../services/location.service';

export const LocationController = {
  getList: async (request: Request<unknown, unknown, unknown, unknown>, response: ServerResponse): Promise<void> => {
    try {
      const locations = await getLocationsList();
      response.status(200).json({data: locations});
    } catch(error) {
      response.status(500).send('Something went wrong');
    }
  },
};
