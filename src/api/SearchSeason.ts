import { ISeasonWithEmbeddedEpisodes } from '../interfaces/EpisodeInterface';
import { Paths } from './http';
import { get } from './http';

const searchSeasonByIdWithEmbedEpisodes = async (id: number): Promise<ISeasonWithEmbeddedEpisodes> => {
  return await get<ISeasonWithEmbeddedEpisodes>(`${Paths.SEASON}/${id}?embed=episodes`);
};

export { searchSeasonByIdWithEmbedEpisodes };
