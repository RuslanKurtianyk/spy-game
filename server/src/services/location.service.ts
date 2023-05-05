import { myDataSource } from '../app-data-source';
import { Location } from '../entity';

export const getLocationsList = async (): Promise<Array<Location>> => {
  const gameRepository = myDataSource.getRepository(Location);
  return await gameRepository.find();
};

export const getRandomLocation = async (): Promise<Location | null> => {
  const gameRepository = myDataSource.getRepository(Location);
  const randomLocation = await gameRepository
    .createQueryBuilder('locations')
    .select()
    .orderBy('RANDOM()')
    .getOne();

  return randomLocation;
};
