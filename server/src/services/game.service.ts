import { myDataSource } from '../app-data-source';
import { Game } from '../entity';

export const getGamesList = async (): Promise<Array<Game>> => {
  const gameRepository = myDataSource.getRepository(Game);
  const res = await gameRepository.find();
  console.log(res);
  return res;
};

export const getGameById = async (id: string): Promise<Game | null> => {
  const gameRepository = myDataSource.getRepository(Game);
  return gameRepository.findOne({ where: { id }});
}

export const createNewGame = async (game: Partial<Game>) => {
  const gameRepository = myDataSource.getRepository(Game);
  const entity = gameRepository.create(game);

  return await gameRepository.save(entity);
}