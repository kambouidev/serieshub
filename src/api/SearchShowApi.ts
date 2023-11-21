import { IShowWithEmbeddedSeasons } from '../interfaces/SeasonInterface';
import { IShow } from '../interfaces/ShowInterface';
import { Paths } from './http';
import { get } from './http';

interface SearchShowResponse {
  score: number;
  show: IShow;
}

/**
 * Searches for a show by query.
 * @param {string} query - The search query.
 * @returns {Promise<Array<SearchShowResponse>>} - Promise containing an array of search responses.
 */
const searchShow = async (query: string): Promise<SearchShowResponse[]> => {
  return await get<SearchShowResponse[]>(`${Paths.SEARCH}?q=${query}`);
};

/**
 * Searches for a show by ID with embedded seasons.
 * @param {number} id - The ID of the show.
 * @returns {Promise<IShowWithEmbeddedSeasons>} - Promise containing show details with embedded seasons.
 */
const searchShowByIdWithEmbedSeasons = async (id: number): Promise<IShowWithEmbeddedSeasons> => {
  return await get<IShowWithEmbeddedSeasons>(`${Paths.SHOWS}s/${id}?embed=seasons`);
};

export { searchShow, searchShowByIdWithEmbedSeasons };
