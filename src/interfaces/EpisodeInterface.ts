import { Season } from './SeasonInterface';

export interface Episode {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number;
  type: string;
  airdate: string;
  airtime: string;
  airstamp: string;
  rating: {
    average: number;
  };
  image: {
    medium: string;
    original: string;
  };
  summary: string;
}

export interface ISeasonWithEmbeddedEpisodes extends Season {
  _embedded: {
    episodes: Episode[];
  };
}
