import { IShow } from '../interfaces/ShowInterface';
import { Paths } from './http';
import { get } from './http';

const getShows = async (page?: number): Promise<IShow[]> => {
  return await get<IShow[]>(`${Paths.SHOWS}?page=${page || 0}`, {});
};

export { getShows };
