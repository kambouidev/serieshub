import { IShow } from '../interfaces/ShowInterface';
import { Paths } from './http';
import { get } from './http';

interface SearchShowResponse {
  score: number;
  show: IShow;
}
const searchShow = async (query: string): Promise<SearchShowResponse[]> => {
  console.log('ESTAMOS BOSCANDOOOOO', query);
  return await get<SearchShowResponse[]>(`${Paths.SEARCH}?q=${query}`, {});
};

export { searchShow };
