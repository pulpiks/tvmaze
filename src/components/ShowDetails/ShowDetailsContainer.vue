<template>
  <div class="show-page" data-test="show-page">
    <b-container v-if="show" fluid data-test="show">
      <div v-if="loading" class="d-flex justify-content-center my-2">
        <b-spinner label="Loading..." variant="secondary"></b-spinner>
      </div>
      <div v-else>
        <show-details :show="show"></show-details>
      </div>
    </b-container>
  </div>
</template>

<script lang="ts">
import { servicesAPI } from '@/api/services'
import { generalErrorHandler } from '@/utils/errorHandler'
import { Component, Vue, Prop } from 'vue-property-decorator'
import ShowDetails from './ShowDetails.vue'

@Component({
  name: 'ShowDetailsContainer',
  components: {
    ShowDetails
  }
})

export default class extends Vue {
  private loading = true

  private show = null

  get showId() {
    return this.$route.params.id
  }

  created() {
    this.fetchShow()
  }

  async fetchShow() {
    try {
      this.loading = true
      const { data: show } = await servicesAPI.getShowById(this.showId)
      this.show = show
    } catch (err) {
      generalErrorHandler(this)(err)
    } finally {
      this.loading = false
    }
  }
}
</script>
