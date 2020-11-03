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
import { fetchShowsFx, filteredShows } from '@/models/shows/index'
import { filterShow, sortByRating, searchByText } from './showsUtils'

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

  get pager() {
    const { currentPage, perPage } = this
    const start = (currentPage - 1) * perPage
    return {
      start,
      end: start + perPage
    }
  }

  created() {
    fetchShowsFx()
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

  effector() {
    return filteredShows
  }
}
</script>

<style scoped lang="scss">

</style>
