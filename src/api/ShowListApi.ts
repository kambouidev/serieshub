import { IShow } from '../interfaces/ShowInterface';
import { Paths, get } from './http';

/**
 * Fetches a list of TV shows based on the provided page.
 * @param {number} [page=0] Page number for pagination.
 * @returns {Promise<IShow[]>} Promise containing the list of TV shows.
 */
const getShows = async (page?: number): Promise<IShow[]> => {
  return await get<IShow[]>(`${Paths.SHOWS}?page=${page || 0}`);
};

export { getShows };
