import { appDataSource } from '../app-data-source';
import { Location } from '../entity';

export const getLocationsList = async (): Promise<Array<Location>> => {
  const gameRepository = appDataSource.getRepository(Location);
  return await gameRepository.find();
};

export const getRandomLocation = async (): Promise<Location | null> => {
  const gameRepository = appDataSource.getRepository(Location);
  const randomLocation = await gameRepository
    .createQueryBuilder('locations')
    .select()
    .orderBy('RAND()')
    .getOne();

  return randomLocation;
};
