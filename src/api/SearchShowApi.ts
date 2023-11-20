import { IShowWithEmbeddedSeasons } from '../interfaces/SeasonInterface';
import { IShow } from '../interfaces/ShowInterface';
import { Paths } from './http';
import { get } from './http';

interface SearchShowResponse {
  score: number;
  show: IShow;
}

const searchShow = async (query: string): Promise<SearchShowResponse[]> => {
  return await get<SearchShowResponse[]>(`${Paths.SEARCH}?q=${query}`);
};

const searchShowByIdWithEmbedSeasons = async (id: number): Promise<IShowWithEmbeddedSeasons> => {
  return await get<IShowWithEmbeddedSeasons>(`${Paths.SHOWS}s/${id}?embed=seasons`);
};

export { searchShow, searchShowByIdWithEmbedSeasons };
