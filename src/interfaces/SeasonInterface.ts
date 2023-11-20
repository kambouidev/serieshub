import { IShow } from './ShowInterface';

export interface Season {
  id: 1;
  number: 1;
  name: '';
  episodeOrder: 13;
  premiereDate: '2013-06-24';
  endDate: '2013-09-16';
  webChannel: null;
  image: {
    medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/24/60941.jpg';
    original: 'https://static.tvmaze.com/uploads/images/original_untouched/24/60941.jpg';
  };
  summary: '';
}

export interface IShowWithEmbeddedSeasons extends IShow {
  _embedded: {
    seasons: Season[];
  };
}
