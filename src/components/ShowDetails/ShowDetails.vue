<template>
  <div class="mt-2">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <h1 data-test="show-details-title">{{show.name}}</h1>
    <b-container fluid class="m-0 p-0">
      <b-row no-gutters>
          <b-col cols="12" md="4">
              <b-img :src="show.image.medium" :alt="show.name" fluid
                class="w-100" data-test="show-details-image"></b-img>
          </b-col>
          <b-col cols="12" md="8" class="pl-md-3">
            <h3 class="mb-2 mt-2 mt-md-0">Details</h3>
            <p>
              <strong class="mr-1">Language:</strong>
              <b-badge class="d-inline-block">{{ show.language }}</b-badge>
            </p>
            <p v-if="show.network">
              <strong>Network:</strong> {{show.network.country.name}} / {{show.network.name}}
            </p>
            <p>
              <strong>Schedule:</strong>
              {{ show.schedule.days.join(',') }} at {{show.schedule.time}}
            </p>
            <p>
              <strong class="mr-1">Links:</strong>
              <a :href="show.officialSite" class="mr-2">Official site</a>
              <a :href="show.url" c>Tvmaze link</a>
            </p>
            <p>
              <strong>Rating: </strong>
              <b-icon class="mr-1" icon="star-fill" variant="warning" font-scale="1"></b-icon>
              {{show.rating.average}}
            </p>
            <div class="mb-1">
              <strong class="mr-1">Genres:</strong>
              <div class="d-inline-block">
                <b-badge class="mr-1" v-for="genre in show.genres" :key="genre">{{genre}}</b-badge>
              </div>
            </div>
            <p>
              <strong class="mr-1">Premiere:</strong>{{  formatDate(show.premiered) }}
            </p>
            <p><strong>Status:</strong> {{ show.status }}</p>
            <p v-if="show.summary" v-html="show.summary"></p>
          </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import format from 'date-fns/format'
import { TShow } from '@/store/shows'
import { servicesAPI } from '../../api/services'
import { generalErrorHandler } from '../../utils/errorHandler'

@Component({
  name: 'ShowDetails'
})

export default class extends Vue {
  @Prop() private show!: TShow;

  // eslint-disable-next-line class-methods-use-this
  formatDate(date: string | number) {
    try {
      return format(new Date(date), 'dd-MM-yyyy')
    } catch (err) {
      return 'Invalid Date'
    }
  }
}
</script>

<style scoped lang="scss">

</style>
