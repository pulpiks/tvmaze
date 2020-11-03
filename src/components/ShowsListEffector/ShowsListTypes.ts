import { TShow } from '@/store/shows'

// actions
export const CHANGE_FILTERS = 'CHANGE_FILTERS'
export const RESET_SEARCH = 'RESET_SEARCH'

// consts
export const FILTER_GENRE = 'genres'
export const FILTER_RATING = 'sortRating'
export const FILTER_SEARCH = 'searchText'


export type TResponseShowSearchByText = {
  score: number,
  show: TShow
}
