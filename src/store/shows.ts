export type TGenre = string;

export enum TStatusEnum {
  Ended = 'Ended',
  Running = 'Running',
  ToBeDetermined = 'To Be Deterrmined'
}

type TDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

type TSchedule = {
  time: string;
  days: TDay[];
};

type TRating = {
  average?: number;
};

type TNetwork = {
  id: number;
  name: string;
  country: {
    name: string;
    code: string;
    timezone: string;
  };
};

type TWebChannel = {
  id: number;
  name: string;
  country: string | null;
} | null;

type TImage = {
  medium: string;
  original: string;
};

export type TShow = {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: TGenre[];
  status: TStatusEnum;
  runtime: number;
  premiered: string;
  officialSite: string;
  schedule: TSchedule;
  rating: TRating;
  weight: number;
  network: TNetwork;
  webChannel: TWebChannel;
  externals: {
    tvrage: number;
    thetvdb: number;
    imdb: string;
  };
  image: TImage;
  summary: string;
  updated: number;
  _links: {
    self: {
      href: string;
    };
    previousepisode?: {
      href: string;
    };
  };
};

export type TShowState = TShow[]

export const defaultShowsState: TShowState = []
export const FETCH_SHOWS = 'FETCH_SHOWS'
export const FETCH_SHOWS_BY_SEARCH = 'FETCH_SHOWS_BY_SEARCH'
