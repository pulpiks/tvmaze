/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import {
  createStore,
  createEffect,
  combine
} from 'effector'

import {
  filterShow,
  sortByRating,
  searchByText
} from '@/components/ShowsList/showsUtils'
import { TShow } from '@/store/shows'
import { $filters, TFiltersState } from '../filters/index'

export const fetchShowsFx = createEffect()

export const $shows = createStore([])

type ShowMap = {
  [key in string]: TShow
}

export const $showsMap = $shows.map((shows: TShow[]) => shows.reduce((res: ShowMap, s) => {
  // eslint-disable-next-line no-param-reassign
  res[s.id] = s
  return res
}, {}))

// return shows
//       .filter(searchByText(searchTerms))
//       .filter(filterShow(filters.genres as any))
//       .sort(sortByRating(filters.sortRating as any))

export const filteredShows = combine(
  $shows,
  $filters,
  (shows: TShow[], filters: TFiltersState) => shows.filter((show) => {
    let matchFilter = false
    for (const prop in filters) {
      const filterValue = (filters as any)[prop]
      if (prop === 'genres') {
        const byGenres = filterShow(filterValue)(show)
        if (!byGenres) {
          matchFilter = false
          break
        }
      } else {
        matchFilter = true
      }
    }
    return matchFilter
  })
)
