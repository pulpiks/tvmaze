export enum TEnumSortRating {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum TEnumFilters {
  genres = 'genres',
  sortRating = 'sortRating',
  searchText = 'searchText'
}

export type TFilterState = {
  [TEnumFilters.genres]: string[],
  [TEnumFilters.sortRating]: TEnumSortRating,
  [TEnumFilters.searchText]: string
}

export const defaultFiltersState: TFilterState = {
  [TEnumFilters.genres]: [],
  [TEnumFilters.sortRating]: TEnumSortRating.DESC,
  [TEnumFilters.searchText]: ''
}

export const SORTING = {
  [TEnumSortRating.ASC]: 'lowest rated',
  [TEnumSortRating.DESC]: 'top rated'
}
