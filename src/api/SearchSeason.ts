import { ISeasonWithEmbeddedEpisodes } from '../interfaces/EpisodeInterface';
import { Paths, get } from './http';

/**
 * Searches for a season by ID with embedded episodes.
 * @param {number} id - The ID of the season.
 * @returns {Promise<ISeasonWithEmbeddedEpisodes>} - Promise containing season details with embedded episodes.
 */
const searchSeasonByIdWithEmbedEpisodes = async (id: number): Promise<ISeasonWithEmbeddedEpisodes> => {
  return await get<ISeasonWithEmbeddedEpisodes>(`${Paths.SEASON}/${id}?embed=episodes`);
};

export { searchSeasonByIdWithEmbedEpisodes };
