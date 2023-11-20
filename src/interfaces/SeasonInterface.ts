import { IShow } from './ShowInterface';

export interface Season {
  id: number;
  number: number;
  name: string;
  episodeOrder: number;
  premiereDate: string;
  endDate: string;
  image: {
    medium: string;
    original: string;
  };
}

export interface IShowWithEmbeddedSeasons extends IShow {
  _embedded: {
    seasons: Season[];
  };
}
