export interface INetwork {
  id: number;
  name: string;
  country: {
    name: string;
    code: string;
    timezone: string;
  };
  officialSite: string;
}

export interface IShowImage {
  medium: string;
  original: string;
}

export interface IShow {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  averageRuntime: number;
  premiered: string;
  ended: string;
  officialSite: string;
  schedule: {
    time: string;
    days: string[];
  };
  rating: {
    average: number;
  };
  weight: number;
  network: INetwork;
  webChannel: null | string;
  dvdCountry: null | string;
  externals: {
    tvrage: number;
    thetvdb: number;
    imdb: string;
  };
  image: IShowImage;
  summary: string;
  updated: number;
  _links: {
    self: {
      href: string;
    };
    previousepisode: {
      href: string;
    };
  };
}

export type FavShow = Pick<IShow, 'id' | 'name'>;
