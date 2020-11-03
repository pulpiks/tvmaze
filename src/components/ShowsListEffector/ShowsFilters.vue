<template>
  <div>
      <search
        placeholder="Search by name"
        :value="searchText"
        @onChange="onSubmit"
        @onReset="onReset"
      ></search>
      <h3 class="mt-1 mb-1">Genres</h3>
      <checkbox-group-tags
        id="genres"
        title=""
        name="genres"
        class-name-form-group="mb-2 mt-2 shows-filters__genres"
        class-name-checkbox="shows-filters__item mb-1 mr-2 d-flex"
        :selected="selectedFilters.genres"
        :options="genresOptions"
        :allSelected="isAllGenresSelected"
        @onChange="changeGenre"
      ></checkbox-group-tags>
      <div class="d-flex justify-content-end mb-2">
        <dropdown :text="allSorts[selectedRating]">
          <template #dropdown-menu>
            <b-dropdown-item href="#" :disabled="selectedRating === sort"
              v-for="sort in Object.keys(allSorts)" :key="sort"
              @click="changeSort(sort)">
              {{ allSorts[sort] }}
            </b-dropdown-item>
          </template>
        </dropdown>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { AxiosResponse } from 'axios'
import CheckboxGroupTags from '@/atoms/CheckboxGroupTags/CheckboxGroupTags.vue'
import Dropdown from '@/atoms/Dropdown/Dropdown.vue'
import Search from '@/atoms/Search/Search.vue'
import { SORTING, TEnumSortRating } from '@/store/filters'
import { FETCH_SHOWS, FETCH_SHOWS_BY_SEARCH } from '@/store/shows'
import { servicesAPI } from '@/api/services'
import { generalErrorHandler } from '@/utils/errorHandler'
import {
  CHANGE_FILTERS,
  FILTER_GENRE,
  FILTER_RATING,
  FILTER_SEARCH,
  RESET_SEARCH,
  TResponseShowSearchByText
} from './ShowsListTypes'

const mapToCheckBoxGroupOptions = (value: string) => ({
  text: value,
  value
})

@Component({
  name: 'ShowsFilters',
  components: {
    CheckboxGroupTags,
    Dropdown,
    Search
  }
})
export default class ShowsFilters extends Vue {
  private allSorts: typeof SORTING = SORTING

  get selectedRating() {
    return this.$store.state.filters.sortRating
  }

  get genresOptions() {
    return this.$store.getters.allGenres.map(mapToCheckBoxGroupOptions)
  }

  get selectedFilters() {
    return this.$store.state.filters
  }

  get isAllGenresSelected() {
    const { state, getters } = this.$store
    return state.filters.genres.length
      || state.filters.genres.length === getters.allGenres.length
  }

  get searchText() {
    return this.$store.state.filters.searchText
  }

  changeGenre(selectedGenres: string[]) {
    this.$store.dispatch({
      type: CHANGE_FILTERS,
      payload: {
        filter: FILTER_GENRE,
        values: selectedGenres
      }
    })
  }

  changeSort(sort: TEnumSortRating) {
    this.$store.dispatch({
      type: CHANGE_FILTERS,
      payload: {
        filter: FILTER_RATING,
        values: sort
      }
    })
  }

  async onSubmit(queryStr: string) {
    // try {
    //   const response: AxiosResponse<TResponseShowSearchByText[]>
    //  = await servicesAPI.searchByText(queryStr)
    //   this.$store.dispatch({
    //     type: FETCH_SHOWS_BY_SEARCH,
    //     payload: response.data.map(item => item.show)
    //   })
    // } catch (err) {
    //   generalErrorHandler(this)(err)
    // } finally {

    // }
    this.$store.dispatch({
      type: CHANGE_FILTERS,
      payload: {
        filter: FILTER_SEARCH,
        values: queryStr
      }
    })
  }

  async onReset() {
    // replace with global action of fetching data
    // try {
    //   const response = await servicesAPI.getShows()
    //   this.$store.dispatch({
    //     type: FETCH_SHOWS,
    //     payload: response.data
    //   })
    // } catch (err) {
    //   generalErrorHandler(this)(err)
    // } finally {

    // }
    this.$store.dispatch({
      type: RESET_SEARCH
    })
  }
}
</script>

<style scoped lang="scss">

</style>
