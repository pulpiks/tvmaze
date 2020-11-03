import { createStore, createEffect, createEvent } from 'effector'

export interface TFiltersState {
  genres: string[],
}

export type ChangeFilterPayload = {
  [k in keyof TFiltersState]?: any
}

export const changeFilter = createEvent<ChangeFilterPayload>()

export const $filters = createStore({
  genres: []
})
