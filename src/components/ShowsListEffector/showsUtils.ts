import { TFilterState, TEnumFilters, TEnumSortRating } from '@/store/filters'
import { TShow } from '@/store/shows'

export const filterShow = (genres: TFilterState[TEnumFilters.genres]) => (show: TShow) => !genres.length || genres.some(genre => show.genres.includes(genre))

export const sortByRating = (sort: TEnumSortRating) => (show1: TShow, show2: TShow) => {
  if (!Number.isNaN(show1.rating.average) && !Number.isNaN(show2.rating.average)) {
    return (sort === TEnumSortRating.ASC
      ? show1.rating.average! - show2.rating!.average!
      : show2.rating.average! - show1.rating.average!)
  } return 0
}

export const searchByText = (searchTerms: string[]) => (show: TShow) => !searchTerms.length
  || searchTerms.every(term => show.name.toLowerCase().includes(term))
