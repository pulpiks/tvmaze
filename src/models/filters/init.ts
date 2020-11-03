import { $filters, changeFilter, ChangeFilterPayload } from './index'

$filters.on(changeFilter, (state, payload: ChangeFilterPayload) => {
  debugger
  return {
    ...state,
    ...payload
  }
})
