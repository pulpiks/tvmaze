<template>
  <div class="home">
    <div
    v-if="loading"
    class="d-flex justify-content-center my-2"
  >
    <b-spinner label="Loading..." variant="secondary"></b-spinner>
  </div>
  <b-container v-else class="px-0" fluid data-test="shows">
    <template v-if="filteredShows.length">
      <div class="shows row row-cols-1 row-cols-lg-4 row-cols-md-3 align-items-stretch d-flex">
        <show-card v-for="show in filteredShows.slice(pager.start, pager.end)" :key="show.id"
          :data="show" class="col mb-4" data-test="show-list-item">
        </show-card>
      </div>
    </template>
    <div
      v-else-if="!filteredShows.length && !loading"
      class="alert px-sm-3 row my-2"
      data-test="shows-list-empty"
      role="alert"
    >
      <div class="d-flex flex-row">
        <span
          class="float-left flex-shrink-0 mr-2 sy-notification-info"
        ></span>
        <span class="flex-grow-1">No shows found</span>
      </div>
    </div>
    <b-pagination
      v-if="filteredShows.length>perPage "
      align="center"
      size="lg"
      v-model="currentPage"
      :total-rows="filteredShows.length"
      :per-page="perPage"
      first-number
      last-number
    ></b-pagination>
  </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { servicesAPI } from '@/api/services'
import { generalErrorHandler } from '@/utils/errorHandler'
import { FETCH_SHOWS, TShow } from '@/store/shows'
import { S } from '@/store/options'
import ShowCard from '@/components/ShowCard/ShowCard.vue'
import { TEnumFilters, TEnumSortRating, TFilterState } from '@/store/filters'
import { SHOWS_LIST_PER_PAGE } from '@/constants/config'

const filterShow = (genres: TFilterState[TEnumFilters.genres]) => (show: TShow) => !genres.length
  || genres.some(genre => show.genres.includes(genre))

const sortByRating = (sort: TEnumSortRating) => (show1: TShow, show2: TShow) => {
  if (!Number.isNaN(show1.rating.average) && !Number.isNaN(show2.rating.average)) {
    return (sort === TEnumSortRating.ASC
      ? show1.rating.average! - show2.rating!.average!
      : show2.rating.average! - show1.rating.average!)
  } return 0
}

const searchByText = (searchTerms: string[]) => (show: TShow) => !searchTerms.length
  || searchTerms.every(term => show.name.toLowerCase().includes(term))

@Component({
  name: 'ShowsListContainer',
  components: {
    ShowCard
  }
  // computed: {
  //   ...mapState([
  //     'shows',
  //     'filters'
  //   ])
  // }
})

export default class extends Vue {
  private loading: boolean = true

  private currentPage: number = 1

  private perPage: number = SHOWS_LIST_PER_PAGE

  get allShows() {
    return this.$store.state.shows
  }

  get pager() {
    const { currentPage, perPage } = this
    const start = (currentPage - 1) * perPage
    return {
      start,
      end: start + perPage
    }
  }

  get filteredShows() {
    const { shows, filters } = this.$store.state as S

    const searchTerms = filters.searchText
      ? filters.searchText
        .toLowerCase()
        .split(/[,\s]+/)
        .filter(term => term.length > 0)
      : []

    return shows
      .filter(searchByText(searchTerms))
      .filter(filterShow(filters.genres as any))
      .sort(sortByRating(filters.sortRating as any))
  }

  created() {
    this.fetchShows()
  }

  async fetchShows() {
    try {
      const response = await servicesAPI.getShows()
      this.$store.dispatch({
        type: FETCH_SHOWS,
        payload: response.data
      })
    } catch (err) {
      generalErrorHandler(this)(err)
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">

</style>
