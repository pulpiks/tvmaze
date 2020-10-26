import { StoreOptions } from 'vuex'
import VuexPersistence from 'vuex-persist'

import {
  CHANGE_FILTERS, FILTER_GENRE, FILTER_RATING, RESET_SEARCH, FILTER_SEARCH
} from '@/components/ShowsList/ShowsListTypes'
import {
  TShowState, defaultShowsState, FETCH_SHOWS, TShow, FETCH_SHOWS_BY_SEARCH
} from './shows'
import { TFilterState, defaultFiltersState } from './filters'

export type S = {
  shows: TShowState,
  filters: TFilterState,
}

const initialState = {
  shows: defaultShowsState,
  filters: defaultFiltersState
}

const vuexLocal = new VuexPersistence({
  key: 'tvmaze',
  storage: window.localStorage,
  reducer: (state: S) => ({
    filters: {
      ...state.filters
    }
  })
})


export const options: StoreOptions<any> = {
  plugins: [vuexLocal.plugin],
  state: { ...initialState },
  mutations: {
    [FETCH_SHOWS](state, action) {
      state.shows = action.payload
    },

    [RESET_SEARCH](state) {
      state.filters[FILTER_SEARCH] = ''
    },
    // fetchServiceDetails(state, action) {
    //   state.serviceDetails = action.payload
    //   state.currentServiceVersion = null
    // },
    [CHANGE_FILTERS](state, action) {
      state.filters[action.filter] = action.values
    }
    // [FETCH_SHOWS_BY_SEARCH](state, action) {
    //   state.shows = action.payload
    // }
  },
  actions: {
    [FETCH_SHOWS]({ commit }, action) {
      commit(action)
    },
    [CHANGE_FILTERS]({ commit }, action) {
      const { payload } = action
      switch (payload.filter) {
        case FILTER_GENRE:
          commit(CHANGE_FILTERS, payload)
          break
        case FILTER_RATING:
          commit(CHANGE_FILTERS, payload)
          break
        case FILTER_SEARCH:
          commit(CHANGE_FILTERS, payload)
          break
        default:
          break
      }
    },
    // [FETCH_SHOWS_BY_SEARCH]({ commit }, action) {
    //   commit(FETCH_SHOWS_BY_SEARCH, action)
    // },
    [RESET_SEARCH]({ commit }) {
      commit(RESET_SEARCH)
    }
    // fetchServiceDetails({ commit }, payload) {
    //   commit(payload)
    // },
    // changeFilter({ commit }, action) {
    //   const { payload } = action
    //   switch (payload.filter) {
    //     case 'types':
    //       commit('changeFilter', payload)
    //       break
    //     case 'technicalTypes':
    //       commit('changeFilter', payload)
    //       break
    //     case 'statuses':
    //       commit('changeFilter', payload)
    //       break
    //     default:
    //       break
    //   }
    // },
    // changeVersion({ commit }, payload) {
    //   commit(payload)
    // },
    // resetAllFilters({ commit }) {
    //   commit('resetAllFilters')
    // },
    // clearServiceDetails({ commit }) {
    //   commit('clearServiceDetails')
    // }
  },
  getters: {
    allGenres: state => state.shows.reduce((genres: string[], curShow: TShow) => {
      curShow.genres.forEach((g) => {
        if (!genres.includes(g)) {
          genres.push(g)
        }
      })
      return genres
    }, [])

    // filteredShows: state => state.shows
    //   .filter(show => show.genres.find(g => state.getters.genres.has(g)))


    // searchText: state => state.servicesList.searchText,
    // servicesFilters: state => state.servicesList,
    // serviceDetails: state => state.serviceDetails,
    // areAnyFiltersActive: state => {
    //   const {
    //     searchText,
    //     filters: { types, technicalTypes, statuses }
    //   } = state.servicesList
    //   return searchText || types.length || technicalTypes.length || statuses
    // }
  }
}
