<template>
  <div class="main-page" data-test="main-page">
      <shows-filters></shows-filters>
      <shows-list-container></shows-list-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ShowsListContainer from '@/components/ShowsList/ShowsListContainer.vue'
import ShowsFilters from '@/components/ShowsList/ShowsFilters.vue'

@Component({
  name: 'Home',
  components: {
    ShowsListContainer,
    ShowsFilters
  }
})
export default class Home extends Vue {
}
</script>
