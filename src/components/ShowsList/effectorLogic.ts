import {createStore, createEffect, createEvent, combine} from 'effector'

export type TGenre = string

export enum TStatusEnum {
  Ended = 'Ended',
  Running = 'Running',
  ToBeDetermined = 'To Be Deterrmined',
}

type TDay =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'

type TSchedule = {
  time: string
  days: TDay[]
}

type TRating = {
  average?: number
}

type TNetwork = {
  id: number
  name: string
  country: {
    name: string
    code: string
    timezone: string
  }
}

type TWebChannel = {
  id: number
  name: string
  country: string | null
} | null

type TImage = {
  medium: string
  original: string
}

export type TShow = {
  id: number
  url: string
  name: string
  type: string
  language: string
  genres: TGenre[]
  status: TStatusEnum
  runtime: number
  premiered: string
  officialSite: string
  schedule: TSchedule
  rating: TRating
  weight: number
  network: TNetwork
  webChannel: TWebChannel
  externals: {
    tvrage: number
    thetvdb: number
    imdb: string
  }
  image: TImage
  summary: string
  updated: number
  _links: {
    self: {
      href: string
    }
    previousepisode?: {
      href: string
    }
  }
}

export type TShowState = TShow[]

export enum TEnumSortRating {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum TEnumFilters {
  genres = 'genres',
  sort = 'sort',
  searchText = 'searchText',
}

export type TFilterState = {
  [TEnumFilters.genres]: string[]
  [TEnumFilters.sort]: TEnumSortRating
  [TEnumFilters.searchText]: string
}

export const defaultFiltersState: TFilterState = {
  [TEnumFilters.genres]: [],
  [TEnumFilters.sort]: TEnumSortRating.DESC,
  [TEnumFilters.searchText]: '',
}

export const SORTING = {
  [TEnumSortRating.ASC]: 'lowest rated',
  [TEnumSortRating.DESC]: 'top rated',
}

export const defaultShowsState: TShowState = []
export const FETCH_SHOWS = 'FETCH_SHOWS'
export const FETCH_SHOWS_BY_SEARCH = 'FETCH_SHOWS_BY_SEARCH'

export const filterShow = (genres: TFilterState[TEnumFilters.genres]) => (
  show: TShow
) => !genres.length || genres.some(genre => show.genres.includes(genre))

export const sortByRating = (sort: TEnumSortRating) => (
  show1: TShow,
  show2: TShow
) => {
  if (
    !Number.isNaN(show1.rating.average) &&
    !Number.isNaN(show2.rating.average)
  ) {
    return sort === TEnumSortRating.ASC
      ? show1.rating.average! - show2.rating!.average!
      : show2.rating.average! - show1.rating.average!
  }
  return 0
}

export const searchByText = (searchTerms: string[]) => (show: TShow) =>
  !searchTerms.length ||
  searchTerms.every(term => show.name.toLowerCase().includes(term))

export interface TFiltersState {
  genres: string[]
}

export type ChangeFilterPayload = {
  [k in keyof TFiltersState]?: any
}

const changeSearch = createEvent()

export const changeFilter = createEvent<ChangeFilterPayload>()

export const $filters = createStore({
  genres: [],
  searchText: '',
  sort: TEnumSortRating.DESC
})

$filters.on(changeFilter, (state, payload: ChangeFilterPayload) => {
  return {
    ...state,
    ...payload
  }
})

export const fetchShowsFx = createEffect(async () => {
  const response = await fetch('https://api.tvmaze.com/shows')
  const res = await response.json()
  return res
})

export const $shows = createStore([])

type ShowMap = {
  [key in typeof TShow.id]: TShow
}

export const $showsMap = $shows.map((shows: TShow[]) => {
  return shows.reduce((res: ShowMap, s) => {
    res[s.id] = s
    return res
  }, {})
})



export const filteredShows = combine(
  $shows,
  $filters,
  (shows: TShow[], filters: TFiltersState) => {
    const {searchText, genres, sort} = filters
    const searchTerms = searchText
      ? searchText
        .toLowerCase()
        .split(/[,\s]+/)
        .filter(term => term.length > 0)
      : []
    const filtered = shows
      .filter(searchByText(searchTerms))
      .filter(filterShow(genres as any))
      .sort(sortByRating(sort as any))
    //console.log('filtered = ', filtered.length)
    return filtered
  }
)


$shows.on(fetchShowsFx.done, (_, {params, result}) => {
  return result
})

fetchShowsFx()

$shows.watch(state => {
  //console.log(state)
})

filteredShows.watch(state => {
	console.log(JSON.stringify(state))
})

// changeFilter({
// 	genres: ['Action'],
// })

// changeFilter({
// 	genres: ['Action', 'Drama'],
//   searchText: 'A'
// })

changeFilter({
	sort: TEnumSortRating.ASC,
  searchText: '',
  genres: ['Drama', 'Fantasy']
})
